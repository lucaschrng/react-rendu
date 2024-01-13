import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useState } from 'react';
import QuantitySelectorCart from './QuantitySelectorCart';
import { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card>
      <CardHeader>
        <img src={product.image} alt={product.title} className="aspect-square object-contain"/>
      </CardHeader>
      <CardContent>
        {product.title} • {product.price}€
      </CardContent>
      <CardFooter>
        <div className="grid w-full gap-1">
          <Link to={`/products/${product.id}`} className="w-full mr-2">
            <Button variant="outline" className="w-full font-semibold">Voir le produit</Button>
          </Link>
          <QuantitySelectorCart
            quantity={quantity}
            setQuantity={setQuantity}
            product={product}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;