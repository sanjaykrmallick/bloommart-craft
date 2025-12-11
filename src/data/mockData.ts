import { Product, Category, Banner, Order, Coupon } from '@/types';

// Sample Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton Slim Fit Shirt',
    brand: 'Raymond',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    ],
    category: 'Men',
    subcategory: 'Shirts',
    rating: 4.5,
    reviewCount: 2341,
    description: 'Classic slim fit cotton shirt perfect for formal and casual occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Black', hex: '#000000' },
    ],
    inStock: true,
    isNew: true,
    tags: ['formal', 'cotton', 'slim-fit'],
  },
  {
    id: '2',
    name: 'Floral Print Maxi Dress',
    brand: 'W for Woman',
    price: 1799,
    originalPrice: 3599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    category: 'Women',
    subcategory: 'Dresses',
    rating: 4.3,
    reviewCount: 1856,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isTrending: true,
    tags: ['floral', 'summer', 'casual'],
  },
  {
    id: '3',
    name: 'Classic Running Shoes',
    brand: 'Nike',
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Footwear',
    subcategory: 'Sports Shoes',
    rating: 4.7,
    reviewCount: 5621,
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Black', hex: '#000000' },
    ],
    inStock: true,
    isBestSeller: true,
    tags: ['sports', 'running', 'comfort'],
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    brand: 'Hidesign',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
    category: 'Accessories',
    subcategory: 'Bags',
    rating: 4.4,
    reviewCount: 892,
    colors: [
      { name: 'Brown', hex: '#92400E' },
      { name: 'Black', hex: '#000000' },
    ],
    inStock: true,
    isNew: true,
    tags: ['leather', 'casual', 'crossbody'],
  },
  {
    id: '5',
    name: 'Digital Smart Watch',
    brand: 'Boat',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    subcategory: 'Smartwatches',
    rating: 4.2,
    reviewCount: 3421,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    inStock: true,
    isTrending: true,
    tags: ['smart', 'fitness', 'waterproof'],
  },
  {
    id: '6',
    name: 'Kids Cartoon T-Shirt',
    brand: 'Max',
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    category: 'Kids',
    subcategory: 'T-Shirts',
    rating: 4.6,
    reviewCount: 567,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    inStock: true,
    isNew: true,
    tags: ['cotton', 'comfortable', 'colorful'],
  },
  {
    id: '7',
    name: 'Premium Denim Jeans',
    brand: 'Levis',
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Men',
    subcategory: 'Jeans',
    rating: 4.5,
    reviewCount: 4532,
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Blue', hex: '#1E40AF' },
      { name: 'Black', hex: '#000000' },
    ],
    inStock: true,
    isBestSeller: true,
    tags: ['denim', 'casual', 'everyday'],
  },
  {
    id: '8',
    name: 'Ethnic Silk Saree',
    brand: 'Fabindia',
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    category: 'Women',
    subcategory: 'Sarees',
    rating: 4.8,
    reviewCount: 1234,
    colors: [
      { name: 'Red', hex: '#DC2626' },
      { name: 'Green', hex: '#16A34A' },
    ],
    inStock: true,
    isTrending: true,
    tags: ['silk', 'traditional', 'wedding'],
  },
  {
    id: '9',
    name: 'Wireless Earbuds Pro',
    brand: 'OnePlus',
    price: 4499,
    originalPrice: 6999,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    category: 'Electronics',
    subcategory: 'Audio',
    rating: 4.4,
    reviewCount: 7821,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
    ],
    inStock: true,
    isBestSeller: true,
    tags: ['wireless', 'noise-cancelling', 'premium'],
  },
  {
    id: '10',
    name: 'Casual Canvas Sneakers',
    brand: 'Converse',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
    category: 'Footwear',
    subcategory: 'Casual Shoes',
    rating: 4.6,
    reviewCount: 3456,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Red', hex: '#EF4444' },
    ],
    inStock: true,
    isNew: true,
    tags: ['canvas', 'casual', 'classic'],
  },
  {
    id: '11',
    name: 'Polarized Aviator Sunglasses',
    brand: 'Ray-Ban',
    price: 5999,
    originalPrice: 9999,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Accessories',
    subcategory: 'Sunglasses',
    rating: 4.7,
    reviewCount: 2134,
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    inStock: true,
    isBestSeller: true,
    tags: ['polarized', 'uv-protection', 'classic'],
  },
  {
    id: '12',
    name: 'Printed Cotton Kurta',
    brand: 'Biba',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500',
    category: 'Women',
    subcategory: 'Kurtas',
    rating: 4.3,
    reviewCount: 1567,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isTrending: true,
    tags: ['cotton', 'printed', 'casual'],
  },
];

// Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Men',
    slug: 'men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500',
    productCount: 15420,
    subcategories: [
      { id: '1-1', name: 'Shirts', slug: 'shirts' },
      { id: '1-2', name: 'T-Shirts', slug: 't-shirts' },
      { id: '1-3', name: 'Jeans', slug: 'jeans' },
      { id: '1-4', name: 'Trousers', slug: 'trousers' },
      { id: '1-5', name: 'Jackets', slug: 'jackets' },
    ],
  },
  {
    id: '2',
    name: 'Women',
    slug: 'women',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500',
    productCount: 23560,
    subcategories: [
      { id: '2-1', name: 'Dresses', slug: 'dresses' },
      { id: '2-2', name: 'Tops', slug: 'tops' },
      { id: '2-3', name: 'Kurtas', slug: 'kurtas' },
      { id: '2-4', name: 'Sarees', slug: 'sarees' },
      { id: '2-5', name: 'Jeans', slug: 'jeans' },
    ],
  },
  {
    id: '3',
    name: 'Kids',
    slug: 'kids',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500',
    productCount: 8930,
    subcategories: [
      { id: '3-1', name: 'Boys', slug: 'boys' },
      { id: '3-2', name: 'Girls', slug: 'girls' },
      { id: '3-3', name: 'Infants', slug: 'infants' },
    ],
  },
  {
    id: '4',
    name: 'Footwear',
    slug: 'footwear',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500',
    productCount: 12450,
    subcategories: [
      { id: '4-1', name: 'Sports Shoes', slug: 'sports-shoes' },
      { id: '4-2', name: 'Casual Shoes', slug: 'casual-shoes' },
      { id: '4-3', name: 'Formal Shoes', slug: 'formal-shoes' },
      { id: '4-4', name: 'Sandals', slug: 'sandals' },
    ],
  },
  {
    id: '5',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    productCount: 18670,
    subcategories: [
      { id: '5-1', name: 'Bags', slug: 'bags' },
      { id: '5-2', name: 'Watches', slug: 'watches' },
      { id: '5-3', name: 'Sunglasses', slug: 'sunglasses' },
      { id: '5-4', name: 'Jewelry', slug: 'jewelry' },
    ],
  },
  {
    id: '6',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
    productCount: 5670,
    subcategories: [
      { id: '6-1', name: 'Smartwatches', slug: 'smartwatches' },
      { id: '6-2', name: 'Audio', slug: 'audio' },
      { id: '6-3', name: 'Mobile Accessories', slug: 'mobile-accessories' },
    ],
  },
];

// Hero Banners
export const heroBanners: Banner[] = [
  {
    id: '1',
    title: 'End of Season Sale',
    subtitle: 'Up to 70% Off on Top Brands',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    backgroundColor: '#4F46E5',
  },
  {
    id: '2',
    title: 'New Summer Collection',
    subtitle: 'Fresh Styles for the Season',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
    ctaText: 'Explore',
    ctaLink: '/products?collection=summer',
    backgroundColor: '#F59E0B',
  },
  {
    id: '3',
    title: 'Premium Electronics',
    subtitle: 'Latest Gadgets at Best Prices',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200',
    ctaText: 'View All',
    ctaLink: '/categories/electronics',
    backgroundColor: '#10B981',
  },
];

// Promotional Banners
export const promoBanners: Banner[] = [
  {
    id: '1',
    title: 'Fashion Week Special',
    subtitle: 'Extra 20% off with code FASHION20',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
    ctaText: 'Grab Now',
    ctaLink: '/offers',
  },
  {
    id: '2',
    title: 'Student Discount',
    subtitle: 'Get 15% off on your first order',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
    ctaText: 'Verify & Save',
    ctaLink: '/student-discount',
  },
];

// Coupons
export const coupons: Coupon[] = [
  {
    code: 'SAVE500',
    description: 'Flat ₹500 off on orders above ₹2999',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 2999,
    validUntil: '2024-12-31',
  },
  {
    code: 'FIRST20',
    description: '20% off on your first order',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 300,
    validUntil: '2024-12-31',
  },
  {
    code: 'FASHION10',
    description: '10% off on fashion products',
    discountType: 'percentage',
    discountValue: 10,
    maxDiscount: 500,
    validUntil: '2024-12-31',
  },
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
};

export const getTrendingProducts = (): Product[] => {
  return products.filter((p) => p.isTrending);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.isBestSeller);
};

export const getDealsOfTheDay = (): Product[] => {
  return products.filter((p) => p.discount && p.discount >= 40);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.brand.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
