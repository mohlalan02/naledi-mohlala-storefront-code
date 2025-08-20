import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [cart, setCart] = useState<CartItem[]>(() => {

    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {

    setCart(prevCart => {

      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {

        // Increase quantity if already in cart
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {

    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (

    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>

      { children }
    </CartContext.Provider>
  );
};

export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
