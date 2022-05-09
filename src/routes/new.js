const express = require('express');
const router = express.Router();
const Recipe = require('../models/addRecipe')



router.get('/', async (req, res) => {
  const recipes = await Recipe.find({});
  console.log(recipes)
  res.render('recipes/recipes.ejs', { recipes: recipes })
})

router.get('/new', (req, res) => {
  res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
  try {
    const recipe = await new Recipe({
      title: req.body.title,
      portion: req.body.portion,
      cost: req.body.cost,
      difficulty: req.body.difficulty,
      preparationTime: Number(req.body.preparationTime),
      cookingTime: Number(req.body.cookingTime),
      totalTime: Number(req.body.totalTime),
      ingredients: req.body.ingredients
    })
    await recipe.save();
    console.log(req.body.ingredients);
    res.redirect('/recipes/new');
  } catch (error) {
    console.log(error);
  }




})

module.exports = router;

