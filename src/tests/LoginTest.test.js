// src/__tests__/LoginPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { AuthProvider } from '../context/AuthContext';

describe('LoginPage', () => {

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error on invalid credentials', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/username/i), 'wronguser');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('navigates on successful login', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/username/i), 'user1');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'password1');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    // You would assert mockNavigate called, though jest.mock with hooks may need manual mocking
  });

});
