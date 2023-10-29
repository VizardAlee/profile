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
  }

}, { timestamps: true })