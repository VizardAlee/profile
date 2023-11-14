import { useProductsContext } from "../hooks/useProductsContext"

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext()

  const handleClick = async() => {
    const response = await fetch('/api/products/' + product._id, {
      method: 'DELETE'
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
      <p>{product.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default ProductDetails
