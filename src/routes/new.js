const express = require('express');
const router = express.Router();

const Recipe = require('../models/addRecipe')

router.get('/', (req, res) => {
  res.render('new.ejs')
})

router.post('/', async (req, res) => {
  res.render('new.ejs')
})

module.exports = router;

