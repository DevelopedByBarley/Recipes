const express = require('express');
const router = express.Router();
const Recipe = require('../models/addRecipe')

router.get('/', async (req, res) => {
  let searchOptions = {};
  searchOptions.title = new RegExp(req.query.title, 'i');
  console.log(searchOptions);
  const recipes = await Recipe.find(searchOptions);
  try {
    res.render('recipes/recipes.ejs', { recipes: recipes, searchOptions: req.query })
  } catch (error) {
    console.error(error)
  }
})

router.get('/new', (req, res) => {
  res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
  fileName = req.body.cover
  try {
    const recipe = await new Recipe({
      title: req.body.title,
      portion: req.body.portion,
      cost: req.body.cost,
      difficulty: req.body.difficulty,
      preparationTime: Number(req.body.preparationTime),
      cookingTime: Number(req.body.cookingTime),
      totalTime: Number(req.body.preparationTime) + Number(req.body.cookingTime),
      ingredients: req.body.ingredients,
      comment: req.body.comment,
      coverImageName: fileName
    })
    await recipe.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
})


router.get('/recipe/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let recipe = await Recipe.findById(id)
    console.log(recipe)
    res.render('recipes/recipe.ejs', { recipe: recipe });
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;

