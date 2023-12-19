import React from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";


const ProductTable = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const handleDelete = async (productId) => {
    // Implement the logic to delete the product with the given productId
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PRODUCT', payload: json });
    }
  };

  // Check if there are no products
  if (!products || products.length === 0) {
    return <div className="product-table">No products available.</div>;
  }

  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Purchase Price (&#x20A6;)</th>
            <th>Profit Margin (%)</th>
            <th>Selling Price (&#x20A6;)</th>
            <th>Quantity</th>
            <th>Last Updated</th>
            <th>Action 1</th>
            <th>Action 2</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              {/* Use Link to navigate to the product details */}
              <td>{product.category}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.profitMargin}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.quantity}</td>
              <td>
                {formatDistanceToNow(
                  new Date(product.updatedAt || product.createdAt),
                  { addSuffix: true }
                )}
              </td>
              <td>
                <Link to={`/product/${product._id}`}>view</Link>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
