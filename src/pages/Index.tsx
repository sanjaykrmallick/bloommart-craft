import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CartDrawer from '@/components/layout/CartDrawer';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategorySection from '@/components/home/CategorySection';
import DealsOfTheDay from '@/components/home/DealsOfTheDay';
import ProductSection from '@/components/home/ProductSection';
import { PromoBanners, TrustBadges, BrandShowcase } from '@/components/home/PromotionalSections';
import {
  heroBanners,
  categories,
  getDealsOfTheDay,
  getTrendingProducts,
  getNewArrivals,
  getBestSellers,
} from '@/data/mockData';

const Index = () => {
  const deals = getDealsOfTheDay();
  const trending = getTrendingProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero Carousel */}
        <section className="md:container md:mt-6">
          <HeroCarousel banners={heroBanners} />
        </section>

        {/* Category Circles */}
        <CategorySection categories={categories} variant="circle" />

        {/* Deals of the Day */}
        <DealsOfTheDay products={deals} />

        {/* Promo Banners */}
        <PromoBanners />

        {/* Trending Products */}
        <ProductSection
          title="Trending Now"
          subtitle="What everyone's loving this week"
          products={trending}
          viewAllLink="/products?filter=trending"
        />

        {/* Category Cards */}
        <CategorySection categories={categories} variant="featured" />

        {/* New Arrivals */}
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh styles just dropped"
          products={newArrivals}
          viewAllLink="/products?filter=new"
          variant="scroll"
        />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Best Sellers */}
        <ProductSection
          title="Best Sellers"
          subtitle="Top picks from our customers"
          products={bestSellers}
          viewAllLink="/products?filter=bestseller"
        />

        {/* Brand Showcase */}
        <BrandShowcase />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
