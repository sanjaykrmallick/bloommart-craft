import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'compact' | 'featured';
}

const CategoryCard = ({ category, variant = 'default' }: CategoryCardProps) => {
  if (variant === 'compact') {
    return (
      <Link to={`/categories/${category.slug}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="flex flex-col items-center text-center group"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors mb-3">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-sm font-medium group-hover:text-primary transition-colors">
            {category.name}
          </span>
        </motion.div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link to={`/categories/${category.slug}`}>
        <motion.div
          whileHover={{ y: -6 }}
          className="category-card group aspect-[4/5] md:aspect-[3/4]"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-background mb-2">
              {category.name}
            </h3>
            {category.productCount && (
              <p className="text-background/70 text-sm mb-4">
                {category.productCount.toLocaleString()}+ Products
              </p>
            )}
            <div className="flex items-center gap-2 text-background font-medium text-sm group-hover:text-accent transition-colors">
              Explore Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/categories/${category.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="category-card group aspect-square"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <h3 className="text-lg font-bold text-background">{category.name}</h3>
          {category.productCount && (
            <p className="text-background/70 text-xs">
              {category.productCount.toLocaleString()}+ items
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
