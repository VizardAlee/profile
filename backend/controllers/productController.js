const Product = require('../models/productModel')
const mongoose = require('mongoose')

//  get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({createdAt: -1})

  res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res)  => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(400).json({error: 'No  such product'})
  }

  res.status(200).json(product)
} 

// create new product
const createProduct = async (req, res) => {
  const {name, category, purchasePrice, profitMargin, sellingPrice} = req.body

  // add to db
  try {
    const product = await Product.create({name, category, purchasePrice, profitMargin, sellingPrice})
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete product

// update product


module.exports = {
  getProduct,
  getProducts,
  createProduct
}