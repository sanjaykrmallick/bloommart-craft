const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-3 w-12" />
          <div className="skeleton h-3 w-8" />
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="skeleton aspect-square w-full" />
    </div>
  );
};

const BannerSkeleton = () => {
  return (
    <div className="skeleton aspect-[21/9] w-full rounded-3xl" />
  );
};

const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export { ProductCardSkeleton, CategoryCardSkeleton, BannerSkeleton, ProductGridSkeleton };
