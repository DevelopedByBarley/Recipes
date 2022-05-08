const express = require('express');
const router = express.Router();

const Recipe = require('../models/addRecipe')

router.get('/', (req, res) => {
  res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
  res.render('recipes/index.ejs')
})

module.exports = router;

