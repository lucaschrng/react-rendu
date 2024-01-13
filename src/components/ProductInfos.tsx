import QuantitySelectorCart from './QuantitySelectorCart';
import { useEffect, useState } from 'react';
import { Product as ProductType } from '../types/product';
import { useGetProductsQuery } from '../services/api';
import { Skeleton } from './ui/skeleton';

type ProductInfosProps = {
  id: string;
}

const ProductInfos: React.FC<ProductInfosProps> = ({ id }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const [product, setProduct] = useState<ProductType>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!products) return;
    const product = products.find((product) => product.id === id);
    if (!product) return;
    setProduct(product);
  }, [products]);

  if (error) return <div>Error</div>;

  if (isLoading) return (
    <div className="flex max-sm:grid">
      <div className="w-full p-2">
        <Skeleton className="aspect-square object-contain"/>
      </div>
      <div className="flex flex-col justify-between p-2 w-full gap-4">
        <div className="grid gap-2 py-1">
          <Skeleton className="h-7 w-2/3"/>
          <Skeleton className="h-5 w-1/3"/>
          <Skeleton className="h-3"/>
        </div>
        <div className="flex gap-1 p-1 rounded w-full justify-between">
          <div className="flex gap-1">
            <Skeleton className="aspect-square h-10"/>
            <Skeleton className="aspect-square h-10"/>
            <Skeleton className="aspect-square h-10"/>
          </div>
          <Skeleton className="aspect-square h-10"/>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex max-sm:grid">
      <div className="w-full p-2">
        <div className="border border-neutral-300 rounded shadow-sm p-4">
          <img src={product?.image} alt={product?.title} className="aspect-square object-contain"/>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 w-full gap-4">
        <div>
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <p
            className="text-xl">{quantity > 1 && `${quantity} x`} {product?.price}€ {quantity > 1 && ` = ${quantity * parseFloat(product?.price ?? '0')}€`}</p>
          {product?.measure && <p className="text-sm text-muted-foreground">
            {product?.measure}{product?.unit_of_measurement}
            •
            {Math.round(parseFloat(product?.price_per_measure) * 100) / 100}€/{product?.unit_of_measurement}
          </p>}
        </div>
        <QuantitySelectorCart
          quantity={quantity}
          setQuantity={setQuantity}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductInfos;