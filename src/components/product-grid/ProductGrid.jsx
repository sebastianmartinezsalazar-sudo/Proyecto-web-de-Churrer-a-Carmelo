// src/components/product-grid/ProductGrid.jsx
import { useState, useEffect } from 'react';
import './ProductGrid.css';
import { fetchProducts, fetchCategories } from '../../services/firebaseProducts';

const ProductGrid = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setHasError(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Loading state
  if (isLoading) {
    return <div className="product-grid-loading">Loading products...</div>;
  }

  // Error state
  if (hasError) {
    return <div className="product-grid-error">Error loading products. Please try again.</div>;
  }

  return (
    <section className="product-grid-section">
      {/* Category filter buttons */}
      <div className="category-filters">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <article key={product.id} className="product-card">
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              )}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.descripcion || product.description}</p>
                <div className="product-footer">
                  <span className="product-price">€{product.price?.toFixed(2)}</span>
                  {product.isAvailable && (
                    <button className="btn-add-to-cart">Add</button>
                  )}
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="no-products">No products found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;