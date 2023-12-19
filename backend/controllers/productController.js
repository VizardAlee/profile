const Product = require('../models/productModel')
const mongoose = require('mongoose')

//  get all products
const getProducts = async (req, res) => {
  const user_id = req.user._id

  const products = await Product.find({ user_id }).sort({createdAt: -1})

  res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res)  => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such product'})
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(400).json({error: 'No  such product'})
  }

  res.status(200).json(product)
} 

// create new product
const createProduct = async (req, res) => {
  const {name, category, purchasePrice, profitMargin, sellingPrice, quantity, sku} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!purchasePrice) {
    emptyFields.push('purchasePrice')
  }
  if(!profitMargin) {
    emptyFields.push('profitMargin')
  }
  if(!sellingPrice) {
    emptyFields.push('sellingPrice')
  }
  if(!quantity) {
    emptyFields.push('quantity')
  }
  if(!sku) {
    emptyFields.push('sku')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in highlighted fields', emptyFields })
  }

  // add to db
  try {
    const user_id = req.user._id

    // Check if a product with the same SKU already exists
    const existingProduct = await Product.findOne({ sku, user_id })

    if (existingProduct) {
      // If the product with the same SKU exists, update the quantity
      existingProduct.quantity += parseInt(quantity, 10)
      await existingProduct.save()
      res.status(200).json(existingProduct)
    } else {
      // If the product with the same SKU doesn't exist, create a new one
      const product = await Product.create({
        name,
        category,
        purchasePrice,
        profitMargin,
        sellingPrice,
        quantity,
        sku,
        user_id,
      })
      res.status(200).json(product)
    }
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// delete product
const deleteProduct =  async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such product'})
  }

  const product = await Product.findOneAndDelete({_id: id})

  if (!product) {
    return res.status(400).json({error: 'No  such product'})
  }

  res.status(200).json(product)
}

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such product'})
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        category: req.body.category,
        purchasePrice: req.body.purchasePrice,
        profitMargin: req.body.profitMargin,
        sellingPrice: req.body.sellingPrice,
        quantity: req.body.quantity,
      },
      { new: true } // return the updated product
    )

    if (!updatedProduct) {
      return res.status(400).json({error: 'No  such product'})
    }

    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
}