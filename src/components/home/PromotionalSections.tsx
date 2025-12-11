import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Gift, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromoBanners = () => {
  const promos = [
    {
      id: 1,
      title: 'Fashion Week Special',
      subtitle: 'Extra 20% off with code',
      code: 'FASHION20',
      gradient: 'from-primary to-primary-dark',
      icon: Tag,
      link: '/products?category=fashion',
    },
    {
      id: 2,
      title: 'Gift Cards Available',
      subtitle: 'Perfect for every occasion',
      code: 'GIFT10',
      gradient: 'from-accent to-accent-light',
      icon: Gift,
      link: '/gift-cards',
    },
  ];

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {promos.map((promo, index) => {
            const IconComponent = promo.icon;
            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={promo.link}>
                  <div
                    className={`relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r ${promo.gradient} text-primary-foreground group`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold">
                            {promo.title}
                          </h3>
                          <p className="text-primary-foreground/80 text-sm">
                            {promo.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="px-4 py-2 bg-primary-foreground/20 rounded-lg font-mono font-bold">
                          {promo.code}
                        </div>
                        <div className="flex items-center gap-2 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          Shop Now
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary-foreground/10" />
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-primary-foreground/5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TrustBadges = () => {
  const badges = [
    { icon: Truck, title: 'Free Shipping', subtitle: 'On orders over ₹999' },
    { icon: Shield, title: 'Secure Payment', subtitle: '100% secure checkout' },
    { icon: Gift, title: 'Easy Returns', subtitle: '30-day return policy' },
    { icon: Tag, title: 'Best Prices', subtitle: 'Price match guarantee' },
  ];

  return (
    <section className="py-10 md:py-16 bg-secondary/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold">{badge.title}</h4>
                <p className="text-sm text-muted-foreground">{badge.subtitle}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const BrandShowcase = () => {
  const brands = [
    'Nike',
    'Adidas',
    'Puma',
    'Levis',
    'Raymond',
    'Allen Solly',
    'Peter England',
    'Van Heusen',
  ];

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          Featured Brands
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="px-6 py-3 rounded-xl bg-secondary/50 font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PromoBanners, TrustBadges, BrandShowcase };
