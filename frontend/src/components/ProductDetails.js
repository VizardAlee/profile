// ProductDetails.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../hooks/useProductsContext';
import EditProduct from './EditProduct';

const ProductDetails = () => {
  const { productId } = useParams();
  const { products } = useProductsContext();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  // Find the product with the given productId
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return <div>No product found</div>;
  }

  const handleEdit = () => {
    // Set the editing state to true
    setEditing(true);
  };

  const handleUpdate = () => {
    // Set the editing state to false
    setEditing(false);
  };

  return (
    <div>
      <h2>{product.name} Details</h2>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      {/* <p>
        <strong>Purchase Price:</strong> {product.purchasePrice}
      </p>
      <p>
        <strong>Profit Margin:</strong> {product.profitMargin}
      </p> */}
      <p>
        <strong>Selling Price:</strong> {product.sellingPrice}
      </p>
      <p>
        <strong>Quantity:</strong> {product.quantity}
      </p>

      <button onClick={() => navigate('/')}>Back to Home</button>

      {/* Render the EditProduct component when the URL includes /edit */}
      {editing ? (
        <EditProduct productId={productId} setEditing={setEditing} handleUpdate={handleUpdate} />
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default ProductDetails;
