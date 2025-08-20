import React, { 
  Suspense 
} from 'react';

import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

import { 
  ProductsPage 
} from './pages/ProductPage/ProductsPage';

import { 
  CartPage 
} from './pages/CartPage/CartPage';

import { 
  CheckoutPage 
} from './components/Checkout/Checkout';

import { 
  LoginPage 
} from './pages/LoginPage/LoginPage';

import { 
  CartProvider 
} from './context/CartContext';

import { 
  AuthProvider 
} from './context/AuthContext';

import { 
  PrivateRoute 
} from './components/PrivateRoute';

import { 
  TopBar 
} from './components/TopBar/TopBar';

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
                } />

              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                } />

              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                } />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
