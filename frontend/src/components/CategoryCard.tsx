import type { Category } from '@/types/commerce';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
      <p className="mt-2 text-sm text-slate-600">Products curated under this category.</p>
    </div>
  );
};

export default CategoryCard;
