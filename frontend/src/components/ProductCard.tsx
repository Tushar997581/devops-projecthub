import { Link } from 'react-router-dom';
import type { Product } from '@/types/commerce';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-32 rounded-xl bg-slate-100" />
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{product.stock} left</span>
        </div>
        <p className="mt-2 text-sm text-slate-600">{product.description || 'A premium CloudMart product.'}</p>
        <p className="mt-3 text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex items-center gap-2">
          <Link to={`/products/${product.id}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">View</Link>
          <button onClick={() => onAddToCart?.(product)} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
