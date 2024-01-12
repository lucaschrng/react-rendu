import { Button } from '../components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Product } from '../types/product';
import { useCart } from '../providers/CartContext';

type QuantitySelectorCartProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  product?: Product;
}

const QuantitySelectorCart: React.FC<QuantitySelectorCartProps> = ({ quantity, setQuantity, product }) => {
  const { addToCart } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!parseInt(e.target.value)) return;
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  return (
    <div className="flex gap-1 border border-neutral-300 p-1 w-fit rounded shadow-sm w-full justify-between">
      <div className="flex gap-1">
        <Button
          variant="secondary"
          className="p-0.5 aspect-square"
          onClick={() => setQuantity(quantity - 1)}
        >
          <Minus size={16}/>
        </Button>
        <Input
          type="text"
          className="w-10 text-center outline-none focus-visible:ring-offset-0"
          value={quantity}
          onChange={handleInputChange}
        />
        <Button
          variant="secondary"
          className="p-0.5 aspect-square"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus size={16}/>
        </Button>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="aspect-square h-10 w-10 p-0.5 ml-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20}/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ajouter au panier</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default QuantitySelectorCart;