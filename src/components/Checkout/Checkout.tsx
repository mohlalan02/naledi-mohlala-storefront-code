import React, { 
  FormEvent 
} from 'react';

import { 
  useCart 
} from '../../context/CartContext';

import 
  CartItem 
from '../../components/CartItem/CartItem';

import './Checkout.css';

export const CheckoutPage: React.FC = () => {

  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: number) => removeFromCart(id);

  const handlePlaceOrder = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    alert('Order placed successfully!');
    // Optional: clear cart after checkout
    // setCart([]);
  };

  if (cart.length === 0) {

    return (

      <div className="checkout-container">

        <h1>
          Checkout
        </h1>

        <p>
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-items">
        {cart.map((item) => (
          <CartItem key={item.id} {...item} onRemove={handleRemove} />
        ))}
      </div>

      <h2 className="checkout-total">Total: R{total.toFixed(2)}</h2>

      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Shipping Address</label>
          <input type="text" placeholder="Enter your address" required />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select required>
            <option value="">Select payment method</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>PayPal</option>
          </select>
        </div>

        <button type="submit" className="checkout-btn">Place Order</button>
      </form>
    </div>
  );
};
