const mongoose = require('mongoose');

const ingredientsShema = new mongoose.Schema({
  ingredient: {
    type: [String],
    required: true
  },
  ingredientPortion: {
    type: [String],
    required: true
  },
  ingredientType: {
    type: [String],
    required: true
  }
})

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
  ingredients: ingredientsShema, 
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