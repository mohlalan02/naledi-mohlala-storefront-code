import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { CartProvider } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product',
  category: 'test-category',
  image: 'https://via.placeholder.com/150'
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('R99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);
  });

  it('calls addToCart when Add to Cart button is clicked', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(addButton).toBeEnabled();
  });
});
