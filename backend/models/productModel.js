const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  profitMargin: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)