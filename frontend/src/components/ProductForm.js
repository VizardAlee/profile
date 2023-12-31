import { useState } from 'react'
import { useProductsContext } from "../hooks/useProductsContext"

const ProductForm = () => {
  const {dispatch} = useProductsContext()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [profitMargin, setProfitMargin] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [quantity, setQuantity] =useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {name, category, purchasePrice, profitMargin, sellingPrice, quantity}

    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
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

      <button>Add Product</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
export default ProductForm