import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './TopBar.css';
import cartIcon from '../assets/images/icon-cart.svg';

export const TopBar: React.FC = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (

    <div className="topbar" role="navigation" aria-label="Main Navigation">

      <div className="topbar-left">

        <p>
          Free shipping on orders over R500 | Winter Sale Now On!
        </p>
      </div>

      <div className="topbar-right">

        <span tabIndex={0} aria-label={`Welcome message: ${ user ? user : 'Guest' }`}>
          Welcome { user ? user : 'Guest' }
        </span>

        { user && (
          <button onClick={logout} aria-label="Logout" className="topbar-logout-button">
            Logout
          </button>
        )}

        <Link to="/" className="topbar-link">
          Home
        </Link>

        <Link to="/cart" className="topbar-link cart-link" aria-label={`Cart with ${ totalItems } items`}>
        
          <img src={ cartIcon } alt="Cart" className="cart-icon" />

          { totalItems > 0 && (

            <span className="cart-badge" aria-live="polite">
              { totalItems }
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
