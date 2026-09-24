import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppShell from "@/components/layout/AppShell";
import { getOrder, Order } from "@/api/resources";
import { getApiErrorMessage } from "@/api/client";
import { toast } from "sonner";

type PaymentInitialization = { clientSecret?: string; status?: string };
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const getPaymentInitialization = (
  orderId?: string,
): PaymentInitialization | null => {
  if (!orderId) return null;
  try {
    const stored = sessionStorage.getItem(`ordermesh-payment-${orderId}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const PaymentForm = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });
    if (result.error) toast.error(result.error.message || "Payment failed");
    else {
      toast.success("Payment submitted. Waiting for backend confirmation.");
      onSubmitted();
    }
    setProcessing(false);
  };
  return (
    <form onSubmit={submit} className="space-y-4 text-left">
      <PaymentElement />
      <button
        disabled={!stripe || !elements || processing}
        className="w-full rounded-lg bg-primary px-5 py-3 text-center font-semibold text-primary-foreground disabled:opacity-50"
      >
        {processing ? "Processing payment..." : "Pay securely with Stripe"}
      </button>
    </form>
  );
};

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [eventMessage, setEventMessage] = useState("");
  const payment = getPaymentInitialization(orderId);
  useEffect(() => {
    if (!orderId) return;
    let active = true;
    const load = () =>
      getOrder(orderId)
        .then((result) => active && setOrder(result))
        .catch((error) => toast.error(getApiErrorMessage(error)));
    load();
    const timer = window.setInterval(load, 10000);
    const handleSuccess = (event: Event) => {
      const payload = (event as CustomEvent<{ orderId?: string }>).detail;
      if (payload?.orderId === orderId) {
        setEventMessage("Payment confirmed by the backend.");
        load();
      }
    };
    const handleFailure = (event: Event) => {
      const payload = (
        event as CustomEvent<{ orderId?: string; failureMessage?: string }>
      ).detail;
      if (payload?.orderId === orderId) {
        setEventMessage(
          payload.failureMessage || "The backend reported a payment failure.",
        );
        load();
      }
    };
    window.addEventListener("ordermesh:payment.succeeded", handleSuccess);
    window.addEventListener("ordermesh:payment.failed", handleFailure);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("ordermesh:payment.succeeded", handleSuccess);
      window.removeEventListener("ordermesh:payment.failed", handleFailure);
    };
  }, [orderId]);
  const isPaid =
    order?.status === "PAID" || order?.payment?.status === "SUCCESS";
  const isFailed =
    order?.status === "CANCELLED" || order?.payment?.status === "FAILED";
  const paymentForm =
    payment?.clientSecret && stripePromise ? (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: payment.clientSecret,
          appearance: { theme: "stripe" },
        }}
      >
        <PaymentForm
          onSubmitted={() =>
            setEventMessage(
              "Payment submitted. Waiting for webhook confirmation.",
            )
          }
        />
      </Elements>
    ) : (
      <p className="text-sm text-destructive">
        Stripe payment is not available. Check the publishable key and payment
        initialization.
      </p>
    );
  return (
    <AppShell>
      <div className="mx-auto max-w-lg rounded-2xl border bg-background p-8 text-center">
        <h1 className="text-2xl font-bold">Payment status</h1>
        {order ? (
          <>
            <p className="mt-2 text-muted-foreground">{order.orderNumber}</p>
            <div className="my-8 rounded-xl bg-secondary p-6">
              <p className="text-sm text-muted-foreground">
                Backend payment status
              </p>
              <p className="mt-2 text-xl font-semibold">
                {order.payment?.status || payment?.status || "PENDING"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The verified webhook and realtime event are authoritative.
              </p>
            </div>
            {eventMessage && (
              <p className="mb-4 text-sm font-medium">{eventMessage}</p>
            )}
            {isPaid ? (
              <p className="font-semibold text-green-600">Payment confirmed.</p>
            ) : isFailed ? (
              <p className="font-semibold text-destructive">
                Payment failed or the order was cancelled.
              </p>
            ) : (
              paymentForm
            )}
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to={`/orders/${order.id}`}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
              >
                View order
              </Link>
              <Link to="/products" className="rounded-lg border px-4 py-2">
                Continue shopping
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-8 text-muted-foreground">Loading payment...</p>
        )}
      </div>
    </AppShell>
  );
};

export default Payment;
