import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopBar } from './TopBar';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('TopBar', () => {
  it('renders Home and Cart links', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <TopBar />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Check that the Home link is present
    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    // Adjusted: Check for Cart icon by its alt text since the link has no text
    expect(screen.getByAltText(/Cart/i)).toBeInTheDocument();
  });
});
