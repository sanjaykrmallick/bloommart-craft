import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  variant?: 'grid' | 'scroll';
}

const ProductSection = ({
  title,
  subtitle,
  products,
  viewAllLink,
  variant = 'grid',
}: ProductSectionProps) => {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Button variant="ghost" asChild className="group hidden md:flex">
              <Link to={viewAllLink}>
                View All
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>

        {/* Products */}
        {variant === 'scroll' ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[160px] md:w-[240px] snap-start"
              >
                <ProductCard product={product} variant="compact" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        {viewAllLink && (
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to={viewAllLink}>
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
