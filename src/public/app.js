

const recipesForm = document.getElementById('recipesForm');

const addIngredient = document.querySelectorAll('.addIngredient')


const title = document.getElementById('title');
const portion = document.getElementById('portion');
const cost = document.getElementsByName('cost');
const difficulty = document.getElementsByName('difficulty');
const preparationTime = document.getElementById('preparationTime');
const cookingTime = document.getElementById('cookingTime');
const totalTime = document.getElementById('totalTime');


const addIngredients = document.getElementById('addIngredients');
const ingredient = document.getElementById('ingredient');
const ingredientPortion = document.getElementById('ingredientPortion');
const ingredientType = document.getElementById('ingredientType');
let ingredients = [];


recipesForm.onsubmit  = async (event) => {

  const cost = getCost();
  const difficulty = getDifficulty();
  console.log(ingredients)

  let body = {
    title: title.value,
    portion: portion.value,
    cost: cost,
    difficulty: difficulty,
    preparationTime: preparationTime.value,
    cookingTime: cookingTime.value,
    totalTime: totalTime.value,
    ingredients: ingredients
    
  }
  

  try {
    const newRecipe = await fetch('/recipes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    console.log(body);
  } catch (error) {
    console.log(error)
  }
  
}

function getCost() {
  for (var i = 0, length = cost.length; i < length; i++) {
    if (cost[i].checked) {
      // do whatever you want with the checked radio
      return cost[i].value;
  
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

function getDifficulty() {
  for (var i = 0, length = difficulty.length; i < length; i++) {
    if (difficulty[i].checked) {
      // do whatever you want with the checked radio
      return difficulty[i].value;
  
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

addIngredients.onclick = (event)   => {
  event.preventDefault();
  const newIngredients = {
    ingredient: ingredient.value,
    ingredientPortion: ingredientPortion.value,
    ingredientType: ingredientType.value
  }

  const template = document.getElementById('ingredientsTemplate');
  var clon = template.content.cloneNode(true);
  document.getElementById('ingredients').appendChild(clon)

  ingredients.push(newIngredients)
  console.log(ingredients)
}
