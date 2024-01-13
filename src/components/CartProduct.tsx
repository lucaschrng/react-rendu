import { Product } from '../types/product';
import { Button } from './ui/button';
import { Minus, Plus, Trash } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from '../providers/CartContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type CartProductProps = {
  product: Product & { cartQuantity: number };
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!parseInt(e.target.value)) return;
    updateCartQuantity(product.id, parseInt(e.target.value));
  };

  return (
    <div className="relative grid gap-4 p-3 border border-neutral-300 rounded shadow-sm">
      <div className="flex gap-4">
        <img src={product.image} alt={product.title} className="aspect-square object-contain h-20"/>
        <div>
          <p className="text-xl">{product.title}</p>
          <p className="text-sm text-muted-foreground">
            {product.price}€
          </p>
        </div>
      </div>

      <div className="flex gap-1 rounded w-full justify-between items-center">
        <div className="flex gap-1">
          <Button
            variant="outline"
            className="p-0.5 aspect-square w-8 h-8"
            onClick={() => updateCartQuantity(product.id, product.cartQuantity - 1)}
          >
            <Minus size={16}/>
          </Button>
          <Input
            type="text"
            className="w-8 h-8 text-sm text-center outline-none focus-visible:ring-offset-0"
            value={product.cartQuantity}
            onChange={handleInputChange}
          />
          <Button
            variant="outline"
            className="p-0.5 aspect-square w-8 h-8"
            onClick={() => updateCartQuantity(product.id, product.cartQuantity + 1)}
          >
            <Plus size={16}/>
          </Button>
        </div>
        <p>
          {product.cartQuantity} x {product.price}€ = <span className="font-bold">{Math.round(parseFloat(product.price) * product.cartQuantity * 100) / 100}€</span>
        </p>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="absolute top-3 right-3 p-1">
            <button
              className="underline text-red-500 text-sm"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash size={16}/>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Retirer du panier</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CartProduct;