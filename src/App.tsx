import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { TopBar } from './components/TopBar';

function App() {
  return (
      <AuthProvider>
        <CartProvider>
          <Router>
            <TopBar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <ProductsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </AuthProvider>
  );
}

export default App;

