import CartItem from '../../components/CartItem/CartItem';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

export const CartPage: React.FC = () => {

  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate();

   const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const handleRemove = useCallback((id: number) => removeFromCart(id), [removeFromCart]);

  return (

    <div className="cart-page">

      <h1>
        Your Cart
      </h1>

      { cart.length === 0 && <p className="empty">
        Your cart is empty.
        </p> }

      <div className="cart-items">

        { cart.map(item => (
          <CartItem key={item.id} { ...item } onRemove={ handleRemove } />
        ))}
      </div>

      <h2 className="total">
        Total: R{ total.toFixed(2) }
      </h2>

      { cart.length > 0 && (
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
       </button>
      )}
    </div>
  );
};
