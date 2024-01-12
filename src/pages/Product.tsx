import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../services/api';
import { useEffect, useState } from 'react';
import { Product as ProductType } from '../types/product';
import QuantitySelectorCart from '../components/QuantitySelectorCart';
import CommentsSection from '../components/CommentsSection';
import { ChevronLeft } from 'lucide-react';

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const { data: products, error, isLoading } = useGetProductsQuery();

  const [product, setProduct] = useState<ProductType>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!products) return;
    const product = products.find((product) => product.id === id);
    if (!product) return;
    setProduct(product);
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (id === undefined) return <div>Error</div>;

  return (
    <>
      <div className="max-w-2xl m-auto p-12">
        <Link to="/" className="flex items-center gap-1 underline mb-4 text-neutral-600 decoration-neutral-400 hover:text-neutral-900 hover:decoration-neutral-500">
          <ChevronLeft size={16}/> Retour aux produits
        </Link>
        <div className="flex">
          <div className="w-full p-2">
            <div className="border border-neutral-300 rounded shadow-sm p-4">
              <img src={product?.image} alt={product?.title} className="aspect-square object-contain"/>
            </div>
          </div>
          <div className="flex flex-col justify-between p-2 w-full">
            <div>
              <h1 className="text-3xl font-bold">{product?.title}</h1>
              <p
                className="text-xl">{quantity > 1 && `${quantity} x`} {product?.price}€ {quantity > 1 && ` = ${quantity * parseFloat(product?.price ?? '0')}€`}</p>
              <p className="text-sm text-muted-foreground">
                {product?.measure}{product?.unit_of_measurement}
                •
                {product?.price_per_measure}€/{product?.unit_of_measurement}
              </p>
            </div>
            <QuantitySelectorCart
              quantity={quantity}
              setQuantity={setQuantity}
              product={product}
            />
          </div>
        </div>

        <div className="border-b border-neutral-300 my-4 mx-2"/>

        <CommentsSection id={id}/>
      </div>
    </>
  );
};

export default Product;