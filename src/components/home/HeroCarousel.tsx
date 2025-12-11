import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Banner } from '@/types';
import { Button } from '@/components/ui/button';

interface HeroCarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  interval?: number;
}

const HeroCarousel = ({ banners, autoPlay = true, interval = 5000 }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative overflow-hidden rounded-none md:rounded-3xl bg-secondary">
      <div className="aspect-[16/9] md:aspect-[21/9] relative">
        <AnimatePresence mode="wait">
          {banners.map((banner, index) =>
            index === currentIndex ? (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container">
                    <div className="max-w-lg">
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-4"
                      >
                        {banner.title}
                      </motion.h2>
                      {banner.subtitle && (
                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-lg md:text-xl text-background/80 mb-6"
                        >
                          {banner.subtitle}
                        </motion.p>
                      )}
                      {banner.ctaText && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Button
                            variant="hero-accent"
                            size="lg"
                            asChild
                          >
                            <Link to={banner.ctaLink || '/products'}>
                              {banner.ctaText}
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/20 backdrop-blur hover:bg-background/40 transition-colors flex items-center justify-center text-background"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/20 backdrop-blur hover:bg-background/40 transition-colors flex items-center justify-center text-background"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-background'
                : 'w-2 bg-background/50 hover:bg-background/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
