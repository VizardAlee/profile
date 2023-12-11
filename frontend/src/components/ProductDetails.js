import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext()
  const { user } = useAuthContext()

  const handleClick = async() => {
    if (!user) {
      return
    }
    const response = await fetch('/api/products/' + product._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_PRODUCT', payload: json})
    }
  }

  return (
    <div className="product-details">
      <h4>{product.name}</h4>
      <p><strong>Category: </strong>{product.category}</p>
      <p><strong>Purchase Price: </strong>{product.purchasePrice}</p>
      <p><strong>Profit Margin: </strong>{product.profitMargin}</p>
      <p><strong>Selling Price: </strong>{product.sellingPrice}</p>
      <p>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ProductDetails
