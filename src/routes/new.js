const express = require('express');
const router = express.Router();
const stringSanitize = require("string-sanitizer");
const Recipe = require('../models/addRecipe')

function sanitizeString(str){
  str = str.toString().replace(/[^a-z0-9áéíóúñü_-\s\.,]/gim,"");
  return str.trim();
  }



router.get('/', async (req,res) => {
  const recipes = await Recipe.find({});
  console.log(recipes)
  res.render('recipes/recipes.ejs', {recipes: recipes})
})

router.get('/new',(req,res) => {
  res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
  const recipe = await new Recipe({
    title: sanitizeString(req.body.title),
    portion: sanitizeString(req.body.portion),
    cost: sanitizeString(req.body.cost),
    difficulty: sanitizeString(req.body.difficulty),
    preparationTime: sanitizeString(Number(req.body.preparationTime)),
    cookingTime: sanitizeString(Number(req.body.cookingTime)),
    totalTime: sanitizeString(Number(req.body.totalTime)),
    ingredients: {
      ingredient: sanitizeString(req.body.ingredient),
      ingredientPortion: sanitizeString(req.body.ingredientPortion),
      ingredientType: sanitizeString(req.body.ingredientType)
    }
  })
  const newRecipe = await recipe.save();

  
  console.log(newRecipe);
  
  res.redirect('/recipes');
  
})

module.exports = router;

