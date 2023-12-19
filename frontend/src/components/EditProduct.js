import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../hooks/useProductsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const EditProduct = ({ productId, setEditing, handleUpdate }) => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext()
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // Find the product with the given productId
  const product = products.find((p) => p._id === productId);

  useEffect(() => {
    // Set form field values when the product is available
    if (product) {
      setName(product.name || '');
      setCategory(product.category || '');
      setPurchasePrice(product.purchasePrice || 0);
      setProfitMargin(product.profitMargin || 0);
      setSellingPrice(product.sellingPrice || 0);
      setQuantity(product.quantity || 0);
    }
  }, [product]);

  // Calculate profit margin based on purchase price and selling price
  useEffect(() => {
    const calculatedProfitMargin = (
      ((sellingPrice - purchasePrice) / purchasePrice) * 100
    ).toFixed(2);
    setProfitMargin(calculatedProfitMargin);
  }, [purchasePrice, sellingPrice]);


  // If product is not defined
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      category,
      purchasePrice,
      profitMargin,
      sellingPrice,
      quantity,
    };

    const response = await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    const json = await response.json();

    if (response.ok) {
      // Update the product in the context state
      const updatedProducts = products.map((p) =>
        p._id === productId ? { ...p, ...json } : p
      );

      dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });

      // Navigate back to the product details page
      navigate('/');
      handleUpdate()
      setEditing(false)
    } else {
      console.error('Update Failed:', json)
    }
  };

  return (
    <div>
      <h2>Edit Product: {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Purchase Price:</label>
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(Number(e.target.value))}
        />

        <label>Profit Margin:</label>
        <input
          type="number"
          value={profitMargin}
          onChange={(e) => setProfitMargin(Number(e.target.value))}
        />

        <label>Selling Price:</label>
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(Number(e.target.value))}
        />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
