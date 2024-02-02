import { useEffect, useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';

const ProductForm = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  // const [purchasePrice, setPurchasePrice] = useState('');
  // const [profitMargin, setProfitMargin] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [skuOption, setSkuOption] = useState('manual');
  const [manualSku, setManualSku] = useState('');
  const [autoGenerateSku, setAutoGenerateSku] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [existingProduct, setExistingProduct] = useState(null);

  // Generate a random alphabetic SKU
  const generateSku = () => {
    const alphanumericChars = 'ABCDEFGHIJKLIMNOPQRSTUVWXYZ0123456789';
    const sku = Array.from({ length: 8 }, () =>
      alphanumericChars[Math.floor(Math.random() * alphanumericChars.length)]
    ).join('');
    setAutoGenerateSku(sku);
  };

  useEffect(() => {
    if (skuOption === 'auto') {
      generateSku();
    }
  }, [skuOption]);

  useEffect(() => {
    // when selecting an SKU, try to find the corresponding product
    if (products) {
      const existingProduct = products.find(
        (product) => product.sku === (skuOption === 'manual' ? manualSku : autoGenerateSku)
      );
      if (existingProduct) {
        setExistingProduct(existingProduct);
        setSelectedProduct(existingProduct);
        setName(existingProduct.name);
        setCategory(existingProduct.category);
        // setPurchasePrice(existingProduct.purchasePrice.toString());
        // setProfitMargin(existingProduct.profitMargin.toString());
        setSellingPrice(existingProduct.sellingPrice.toString());
      } else {
        setExistingProduct(null);
        setSelectedProduct(null);
        setName('');
        setCategory('');
        // setPurchasePrice('');
        // setProfitMargin('');
        setSellingPrice('');
      }
    }
  }, [manualSku, autoGenerateSku, skuOption, products]);

  // useEffect(() => {
  //   // Calculate selling price based on purchase price and margin
  //   if (purchasePrice !== '' && profitMargin !== '') {
  //     const calculatedSellingPrice = (
  //       parseFloat(purchasePrice) * (1 + parseFloat(profitMargin) / 100)
  //     ).toFixed(2);
  //     setSellingPrice(calculatedSellingPrice);
  //   }
  // }, [purchasePrice, profitMargin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const product = {
      name,
      category,
      // purchasePrice: parseFloat(purchasePrice),
      // profitMargin: parseFloat(profitMargin),
      sellingPrice: parseFloat(sellingPrice),
      quantity: parseFloat(quantity),
      sku: skuOption === 'manual' ? manualSku : autoGenerateSku,
      // include the updated timestamp in the payload
      updatedTimestamp: Date.now(),
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      // Exclude auto-filled fields from validation
      setEmptyFields(json.emptyFields.filter((field) => !['sellingPrice', 'quantity'].includes(field)));
    }

    if (response.ok) {
      setName('');
      setCategory('');
      // setPurchasePrice('');
      // setProfitMargin('');
      setSellingPrice('');
      setQuantity('');
      setManualSku('');
      setAutoGenerateSku('');
      setSkuOption('manual');
      setError(null);
      setEmptyFields([]);
    
      // dispatch({ type: 'CREATE_PRODUCT', payload: json });

      // Replace the existing product in the state if it already exists
      const existingIndex = products.findIndex((existing) => existing.sku === json.sku)
      if (existingIndex !== -1) {
        // Include the updated timestamp in the payload
        const updatedProduct = { ...json, updatedTimestamp: Date.now() }
        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct, index: existingIndex })
      } else {
        dispatch({ type: 'CREATE_PRODUCT', payload: json })
      }

      setSelectedProduct(null);
      console.log('new product added', json);
    
      // Show a toast notification
      toast.success('New product added', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      })
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new product</h3>

      <label>SKU Option</label>
      <select
        value={skuOption}
        onChange={(e) => {
          setSkuOption(e.target.value);
          setManualSku(''); // Reset manual SKU when changing SKU option
        }}
        className={emptyFields.includes('skuOption') ? 'error' : ''}
      >
        <option value="manual">Manual</option>
        <option value="auto">Auto-generate</option>
      </select>

      {skuOption === 'manual' && (
        <>
          <label>Manual SKU</label>
          <input type="text" onChange={(e) => setManualSku(e.target.value)} value={manualSku} />
        </>
      )}

      {skuOption === 'auto' && (
        <>
          <label>Auto-generated SKU</label>
          <input
            type="text"
            readOnly
            value={existingProduct ? existingProduct.sku : autoGenerateSku}
          />
        </>
      )}

      {selectedProduct && (
        <>
          <label>Product Name</label>
          <input
            type="text"
            readOnly
            value={existingProduct ? existingProduct.name : ''}
            className={emptyFields.includes('name') ? 'error' : ''}
          />
          <label>Product Category</label>
          <input
            type="text"
            readOnly
            value={existingProduct ? existingProduct.category : ''}
          />
        </>
      )}

      {!selectedProduct && (
        <>
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
          />
          <label>Product Category</label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </>
      )}

      {/* <label>Purchase Price</label>
      <input
        type="number"
        onChange={(e) => setPurchasePrice(e.target.value)}
        value={purchasePrice}
        className={emptyFields.includes('purchasePrice') ? 'error' : ''}
      />

      <label>Profit Margin</label>
      <input
        type="number"
        onChange={(e) => setProfitMargin(e.target.value)}
        value={profitMargin}
        className={emptyFields.includes('profitMargin') ? 'error' : ''}
      /> */}

      <label>Selling Price</label>
      <input
        type="number"
        readOnly
        value={sellingPrice}
        className={emptyFields.includes('sellingPrice') ? 'error' : ''}
      />

      <label>Quantity</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes('quantity') ? 'error' : ''}
      />

      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
