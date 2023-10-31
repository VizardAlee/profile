const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <h4>{product.name}</h4>
      <p><strong>Category: </strong>{product.category}</p>
      <p><strong>Purchase Price: </strong>{product.purchasePrice}</p>
      <p><strong>Profit Margin: </strong>{product.profitMargin}</p>
      <p><strong>Selling Price: </strong>{product.sellingPrice}</p>
      <p>{product.createdAt}</p>
    </div>
  )
}

export default ProductDetails
