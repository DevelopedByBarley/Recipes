const express = require('express');
const router = express.Router();

const Recipe = require('../models/addRecipe')

router.get('/', (req, res) => {
  res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
  const recipe = await new Recipe({
    title: req.body.title,
    portion: req.body.portion,
    cost: req.body.cost,
    difficulty: req.body.difficulty,
    preparationTime: Number(req.body.preparationTime),
    cookingTime: Number(req.body.cookingTime),
    totalTime: Number(req.body.totalTime),
    ingredients: {
      ingredient: req.body.ingredient,
      ingredientPortion: req.body.ingredientPortion,
      ingredientType: req.body.ingredientType
    }
  })
  const newRecipe =  await recipe.save();

  console.log(newRecipe);

  res.render('recipes/index.ejs')
})

module.exports = router;

