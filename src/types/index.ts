export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
}
