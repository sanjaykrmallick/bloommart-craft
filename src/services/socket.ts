import { io, Socket } from "socket.io-client";
import { API_URL } from "@/api/client";

let socket: Socket | null = null;

export const connectNotifications = (accessToken: string) => {
  if (socket?.connected) socket.disconnect();
  const socketOrigin = API_URL.replace(/\/api\/?$/, "");
  socket = io(`${socketOrigin}/notifications`, {
    auth: { token: accessToken },
    autoConnect: true,
    reconnection: true,
  });
  for (const event of [
    "notification.created",
    "order.updated",
    "payment.succeeded",
    "payment.failed",
  ]) {
    socket.on(event, (payload) =>
      window.dispatchEvent(
        new CustomEvent(`ordermesh:${event}`, { detail: payload }),
      ),
    );
  }
  return socket;
};

export const disconnectNotifications = () => {
  socket?.disconnect();
  socket = null;
};
