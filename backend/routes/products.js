const express = require('express')
const Product = require('../models/productModel')

const router = express.Router()

//  GET all products
router.get('/', (req, res) => {
  res.json({mssg: 'GET all products'})
})

// GET a single product
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single product'})
})

//  POST a new product
router.post('/', async (req, res) => {
  const {name, category, purchasePrice, profitMargin, sellingPrice} = req.body

  try {
    const product = await Product.create({name, category, purchasePrice, profitMargin, sellingPrice})
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  res.json({mssg: 'POST a new product'})
})

//  DELETE a product
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a product'})
})

//  UPDATE a product
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a product'})
})



module.exports = router