import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const wrapper = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

const sampleProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'test-category',
  image: 'test.jpg',
};

describe('CartContext', () => {
  it('adds and removes items from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    // Initially empty
    expect(result.current.cart).toHaveLength(0);

    // Add item
    act(() => {
      result.current.addToCart(sampleProduct);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);

    // Add same item again (should increase quantity)
    act(() => {
      result.current.addToCart(sampleProduct);
    });
    expect(result.current.cart[0].quantity).toBe(2);

    // Remove item
    act(() => {
      result.current.removeFromCart(sampleProduct.id);
    });
    expect(result.current.cart).toHaveLength(0);
  });
});
