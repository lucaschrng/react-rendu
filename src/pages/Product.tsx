import { Link, useParams } from 'react-router-dom';
import CommentsSection from '../components/CommentsSection';
import { ChevronLeft } from 'lucide-react';
import ProductInfos from '../components/ProductInfos';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <div>Error</div>;

  return (
    <div className="max-w-2xl m-auto p-12 max-sm:px-2">
      <Link to="/" className="flex items-center gap-1 underline mb-4 text-neutral-600 decoration-neutral-400 hover:text-neutral-900 hover:decoration-neutral-500">
        <ChevronLeft size={16}/> Retour aux produits
      </Link>

      <ProductInfos id={id} />

      <div className="border-b border-neutral-300 my-4 mx-2"/>

      <CommentsSection id={id}/>
    </div>
  );
};

export default Product;