import { Button } from '../components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../providers/CartContext';
import CartProduct from '../components/CartProduct';
import { ScrollArea } from '../components/ui/scroll-area';

const Cart = () => {
  const { cart } = useCart();
  const totalProducts = cart.reduce((acc, item) => acc + item.cartQuantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-0 right-0 m-8">
          <div className="relative">
            <Button className="flex items-center gap-2">
              <ShoppingCart size={20}/>
            Panier
            </Button>
            {totalProducts > 0 && (
              <span
                className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-4 px-1 flex items-center justify-center">
                {totalProducts}
              </span>
            )}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="p-0">
        <ScrollArea className="h-dvh">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle>Votre panier</SheetTitle>
              <SheetDescription>
              Retrouvez ici tous les produits que vous avez ajoutés à votre panier.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-1 py-4">
              {cart.map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            <SheetFooter className="flex items-center gap-2">
              <p>
                Total: <span className="font-bold">{Math.round(cart.reduce((acc, item) => acc + item.cartQuantity * parseFloat(item.price), 0) * 100) / 100}€</span>
              </p>
              <SheetClose asChild>
                <Button type="submit">Passer au paiement</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;