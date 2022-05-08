const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  portion: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    requied: true
  },
  difficult: {
    type: String,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  ingredient: {
    type: String,
    required: true
  },
  steps: {
    type: String,
    required: true,
  },
  coverImageName: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: () => Date.now()
  }
})


module.exports = mongoose.model('Recipes', recipeSchema);