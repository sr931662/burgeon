import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts(filters);
        setProducts(response.data.data || []);
        setPagination({
          total: response.total || 0,
          page: response.page || 1,
          limit: response.limit || 12
        });
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  const categories = [
    'Hydraulic Presses',
    'CNC Machines',
    'Conveyor Systems',
    'Industrial Robots',
    'Packaging Equipment'
  ];

  return (
    <div>
      <h1>Our Products</h1>

      {/* Category Filter */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Category</h3>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && <div>Loading products...</div>}

      {/* Error State */}
      {error && <div>Error: {error}</div>}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div>No products found in this category.</div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <>
          <div>
            {products.map(product => (
              <div key={product._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
                <h2>{product.name}</h2>
                <p>{product.shortDescription}</p>
                <div>
                  <strong>Category:</strong> {product.category}
                </div>
                {product.industry && (
                  <div>
                    <strong>Industry:</strong> {product.industry.name}
                  </div>
                )}
                <a href={`/products/${product.slug}`}>View Details →</a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {Math.ceil(pagination.total / pagination.limit) > 1 && (
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 1}
              >
                Previous
              </button>
              <span> Page {filters.page} of {Math.ceil(pagination.total / pagination.limit)} </span>
              <button 
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page === Math.ceil(pagination.total / pagination.limit)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;