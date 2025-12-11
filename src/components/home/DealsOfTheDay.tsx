import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

interface DealsOfTheDayProps {
  products: Product[];
}

const DealsOfTheDay = ({ products }: DealsOfTheDayProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Deals of the Day</h2>
              <p className="text-muted-foreground text-sm">
                Limited time offers at amazing prices
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ends in:</span>
            <div className="flex gap-1">
              <div className="deal-timer">
                <span>{formatTime(timeLeft.hours)}</span>
                <span className="text-muted-foreground/70">h</span>
              </div>
              <span className="text-xl font-bold">:</span>
              <div className="deal-timer">
                <span>{formatTime(timeLeft.minutes)}</span>
                <span className="text-muted-foreground/70">m</span>
              </div>
              <span className="text-xl font-bold">:</span>
              <div className="deal-timer">
                <span>{formatTime(timeLeft.seconds)}</span>
                <span className="text-muted-foreground/70">s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.slice(0, 5).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
