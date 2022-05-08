const express = require('express');
const router = express.Router();
const Recipe = require('../models/addRecipe')

router.get('/', async (req,res) => {
  await new Recipe()
  res.render('index.ejs')
})

module.exports = router;