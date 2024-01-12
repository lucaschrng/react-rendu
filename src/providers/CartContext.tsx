import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Product } from '../types/product';

type CartProduct = Product & {
  cartQuantity: number;
}

type CartContextType = {
  cart: CartProduct[];
  addToCart: (product: Product, cartQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, cartQuantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {}
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: Product, cartQuantity: number = 1) => {
    setCart((currentCart) => {
      const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
      if (existingProductIndex >= 0) {
        const updatedCart = currentCart.slice();
        updatedCart[existingProductIndex] = {
          ...currentCart[existingProductIndex],
          cartQuantity: currentCart[existingProductIndex].cartQuantity + cartQuantity
        };
        return updatedCart;
      } else {
        return [...currentCart, { ...product, cartQuantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const existingProductIndex = currentCart.findIndex(item => item.id === productId);
      if (existingProductIndex >= 0) {
        const updatedCart = currentCart.slice();
        updatedCart.splice(existingProductIndex, 1);
        return updatedCart;
      } else {
        return currentCart;
      }
    });
  };

  const updateCartQuantity = (productId: string, cartQuantity: number) => {
    setCart((currentCart) => {
      const existingProductIndex = currentCart.findIndex(item => item.id === productId);
      if (existingProductIndex >= 0) {
        if (cartQuantity <= 0) {
          return currentCart.filter(item => item.id !== productId);
        }
        const updatedCart = currentCart.slice();
        updatedCart[existingProductIndex] = {
          ...currentCart[existingProductIndex],
          cartQuantity
        };
        return updatedCart;
      } else {
        return currentCart;
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart(){
  return useContext(CartContext);
}