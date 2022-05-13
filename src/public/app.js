

const recipesForm = document.getElementById('recipesForm');
const addIngredient = document.querySelectorAll('.addIngredient')
const title = document.getElementById('title');
const portion = document.getElementById('portion');
const cost = document.getElementsByName('cost');
const difficulty = document.getElementsByName('difficulty');
const preparationTime = document.getElementById('preparationTime');
const cookingTime = document.getElementById('cookingTime');
const totalTime = document.getElementById('totalTime');
const comment = document.getElementById('comment')
const cover = document.querySelector('#cover');
const addIngredients = document.getElementById('addIngredients');
const ingredient = document.getElementById('ingredient');
const ingredientPortion = document.getElementById('ingredientPortion');
const ingredientType = document.getElementById('ingredientType');

let ingredients = [];

recipesForm.onsubmit = async (event) => {
  event.preventDefault();
  const costValue = getValueFromRadio(cost);
  const difficultyValue = getValueFromRadio(difficulty);

  let allergen = checkAllergen();
  console.log(allergen)

  let body = {
    title: title.value,
    portion: portion.value,
    cost: costValue,
    difficulty: difficultyValue,
    preparationTime: preparationTime.value,
    cookingTime: cookingTime.value,
    totalTime: totalTime,
    ingredients: ingredients,
    comment: comment.value
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

function getValueFromRadio(radio) {
  for (var i = 0, length = radio.length; i < length; i++) {
    if (radio[i].checked) {
      return radio[i].value;

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

addIngredients.onclick = (event) => {
  console.log(ingredients);
  event.preventDefault();
  const newIngredients = {
    ingredientName: ingredient.value,
    ingredientPortion: Number(ingredientPortion.value),
    ingredientType: ingredientType.value
  }

  ingredient.value = ''
  ingredientPortion.value = ''

  ingredients.push(newIngredients)

  renderIngredients();
}

function renderIngredients() {
  let temp = ``

  ingredients.forEach((ingredient, index) => {
    temp += `
    <tr>
      <td>${index + 1}</td>
      <td>${ingredient.ingredientName}</td>
      <td>${ingredient.ingredientPortion}/g</td>
      <td >${ingredient.ingredientType}</th>
      <td>
        <button class="deleteBtn btn-danger btn" data-id="${index}">Törlés</button>
        <button class="editBtn btn-info btn" data-id="${index}">Szerkeszt</button>
      </td>
    </tr>
    `
  })

  document.getElementById('ingredientsTemplate').innerHTML = temp;
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', deleteIngredients)
  })
}

function deleteIngredients(event) {
  event.preventDefault();
  let id = Number(event.target.dataset.id);
  ingredients.splice(id, 1)
  renderIngredients()
}

function checkAllergen() {
  for(let ingredient of ingredients ) {
    if(ingredient.ingredientType === 'Tejtermék') {
      return 'Laktózos'
    }
  }
}