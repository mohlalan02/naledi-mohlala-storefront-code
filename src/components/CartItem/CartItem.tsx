/* eslint-disable react/prop-types */
import React from 'react';

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = React.memo(

  ({ id, 
    title,
    price, 
    quantity, 
    image, 
  onRemove }) => {

    return (

      <div className="cart-item" role="group" aria-labelledby={`cart-item-${id}-title`}>

        <img src={ image } alt={ title } className="item-image" />

        <div className="item-details">

          <h3 id={`cart-item-${id}-title`}>
            { title }
          </h3>

          <p>
            Quantity: { quantity }
          </p>

          <p>
            Subtotal: R{(price * quantity).toFixed(2)}
          </p>

          <button
            className="remove-button"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${title} from cart`}>
            Remove
          </button>
        </div>
      </div>
    );
  }
);

CartItem.displayName = 'CartItem';

export default CartItem;
