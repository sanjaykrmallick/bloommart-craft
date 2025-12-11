import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '@/components/product/CategoryCard';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';

interface CategorySectionProps {
  categories: Category[];
  variant?: 'circle' | 'card' | 'featured';
}

const CategorySection = ({ categories, variant = 'card' }: CategorySectionProps) => {
  if (variant === 'circle') {
    return (
      <section className="py-8 md:py-12">
        <div className="container">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Shop by Category
          </h2>
          <div className="flex justify-center gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CategoryCard category={category} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'featured') {
    return (
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
              <p className="text-muted-foreground mt-1">
                Find what you're looking for
              </p>
            </div>
            <Button variant="ghost" asChild className="group hidden md:flex">
              <Link to="/categories">
                All Categories
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CategoryCard category={category} variant="featured" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-secondary/50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
