import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../services/api';
import { Product } from '../../types';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ErrorScreen } from '../../Shared/ErrorScreen';
import errorIcon from '../assets/images/error-icon.png';
import './ProductsPage.css';

export const ProductsPage: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: products = [],
     isLoading, isError,
      error, refetch 
    } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) 
    return <p>Loading products...</p>;

  if (isError)

    return (

      <ErrorScreen
        title="Failed to load products"
        message={error?.message}
        iconSrc={errorIcon}
        onRetry={() => refetch()}/>
    );

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (

    <div className="products-page">

      <h1>
        Products
      </h1>

      <div className="content">

        <aside className="sidebar">

          <h3>
            Filter by Category
          </h3>

          <ul>

            { categories.map(cat => (

              <li
                key={ cat }
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedCategory(cat)}>
                { cat }
              </li>
            ))}
          </ul>
        </aside>

        <div className="products-grid">

          { filteredProducts.map(product => (

            <ProductCard 
              key={product.id} 
              product={product} /> ))}
        </div>
      </div>
    </div>
  );
};
