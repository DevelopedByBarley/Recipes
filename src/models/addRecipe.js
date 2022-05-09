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
  difficulty: {
    type: String,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  }, 
  steps: {
    type: String,
    required: false,
  },
  coverImageName: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  uploadDate: {
    type: Date,
    default: () => Date.now()
  }
})


module.exports = mongoose.model('Recipes', recipeSchema);