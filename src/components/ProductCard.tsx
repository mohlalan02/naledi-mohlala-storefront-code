import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-card" role="group" aria-labelledby={`product-title-${product.id}`}>
      <img src={product.image} alt={product.title} className="product-image" />

      <h3 id={`product-title-${product.id}`} className="product-title">
        {product.title}
      </h3>

      <p className="product-price" aria-label={`Price R${product.price}`}>
        R{product.price}
      </p>

      <div className="button-group">
        <button
          className="add-button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>

        <button
          className="view-button"
          onClick={() => navigate('/cart')}
          aria-label="View your shopping cart"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};
