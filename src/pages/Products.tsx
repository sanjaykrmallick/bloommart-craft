import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/mockData';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = searchQuery
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {filteredProducts.length} products found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
            <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'
          : 'space-y-4'
        }>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} variant={viewMode === 'list' ? 'horizontal' : 'default'} />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Products;
