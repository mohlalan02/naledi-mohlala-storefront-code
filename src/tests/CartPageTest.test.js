import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartPage } from '../components/CartPage';
import { CartProvider } from '../context/CartContext';

const sampleCart = [
  { id: 1, title: 'Item 1', price: 100, quantity: 2, image: 'img1.png' },
  { id: 2, title: 'Item 2', price: 50, quantity: 1, image: 'img2.png' },
];

describe('CartPage', () => {

  test('renders empty cart message', () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items and total', () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );
  });

  test('removes item from cart', async () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );

    const removeButtons = screen.queryAllByText(/remove/i);
    if (removeButtons.length) {
      await userEvent.click(removeButtons[0]);
    }
  });

});
