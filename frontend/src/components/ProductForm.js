import { useEffect, useState } from 'react'
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ProductForm = () => {
  const {products, dispatch} = useProductsContext()
  const {user} = useAuthContext()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [profitMargin, setProfitMargin] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [quantity, setQuantity] =useState('')
  const [skuOption, setSkuOption] = useState('manual')
  const [manualSku, setManualSku] = useState('')
  const [autoGenerateSku, setAutoGenerateSku] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // Generate a random alphabetic SKU
  const generateSku = () => {
    const alpanumericChars = 'ABCDEFGHIJKLIMNOPQRSTUVWXYZ0123456789';
    const sku = Array.from({ length: 8 }, () => alpanumericChars[Math.floor(Math.random() * alpanumericChars.length)]).join('');
    setAutoGenerateSku(sku)
  }

  useEffect(() =>  {
    if (skuOption === 'auto') {
      generateSku();
    }
  }, [skuOption])

  useEffect(() => {
    // Calculate selling price based on purchase price and margin
    if (purchasePrice !== '' && profitMargin !== '') {
      const calculatedSellingPrice = (parseFloat(purchasePrice) * (1 + parseFloat(profitMargin) / 100)).toFixed(2);
      setSellingPrice(calculatedSellingPrice);
    }
  }, [purchasePrice, profitMargin]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const skuToCheck = skuOption === 'manual' ? manualSku : autoGenerateSku;

    // Check for duplicate SKU
    if (products.some((product) => product.sku === skuToCheck)) {
      setError('SKU already exists. Please choose a different one.')
      return
    }

    const product = {
      name,
      category,
      purchasePrice,
      profitMargin,
      sellingPrice,
      quantity,
      sku: skuOption === 'manual' ? manualSku : autoGenerateSku,
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setName('')
      setCategory('')
      setPurchasePrice('')
      setProfitMargin('')
      setSellingPrice('')
      setQuantity('')
      setManualSku('')
      setAutoGenerateSku('')
      setSkuOption('manual')
      setError(null)
      setEmptyFields([])
      console.log('new product added', json)
      dispatch({type: 'CREATE_PRODUCT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new product</h3>

      <label>Product Name</label>
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Product Category</label>
      <input
        type='text'
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />

      <label>Purchase Price</label>
      <input
        type='number'
        onChange={(e) => setPurchasePrice(e.target.value)}
        value={purchasePrice}
        className={emptyFields.includes('purchasePrice') ? 'error' : ''}
      />

      <label>Profit Margin</label>
      <input
        type='number'
        onChange={(e) => setProfitMargin(e.target.value)}
        value={profitMargin}
        className={emptyFields.includes('profitMargin') ? 'error' : ''}
      />

      <label>Selling Price</label>
      <input
        type='number'
        onChange={(e) => setSellingPrice(e.target.value)}
        value={sellingPrice}
        className={emptyFields.includes('sellingPrice') ? 'error' : ''}
      />

      <label>Quantity</label>
      <input
        type='number'
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes('quantity') ? 'error' : ''}
      />

      <label>SKU Option</label>
      <select value={skuOption} onChange={(e) => setSkuOption(e.target.value)}>
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
          <input type="text" readOnly value={autoGenerateSku} />
        </>
      )}
      <button>Add Product</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
export default ProductForm