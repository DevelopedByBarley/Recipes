const express = require('express');
const router = express.Router();
const Recipe = require('../models/addRecipe')
const Image = require('../models/upload')
const path = require('path');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: './src/public/uploads/images',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  let searchOptions = {};
  searchOptions.title = new RegExp(req.query.title, 'i');
  const recipes = await Recipe.find(searchOptions);
  const images = await Image.find({});
  try {
    res.render('recipes/recipes.ejs', { recipes: recipes, searchOptions: req.query, images: images })
  } catch (error) {
    console.error(error)
  }
})

router.get('/new', (req, res) => {

  res.render('recipes/new.ejs', {})
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

router.post('/single', upload.single('cover'), async (req, res) => {
  console.log(req.file.filename)
  const images = await new Image({
    title: req.file.filename
  })
  await images.save();
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

router.delete('/recipe', async (req, res) => {
  let id = req.body.id;
  try {
    await Recipe.findByIdAndDelete(id)
    const recipes = await Recipe.find({});
    res.render('recipes/recipes', { recipes: recipes, searchOptions: '' });
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;

