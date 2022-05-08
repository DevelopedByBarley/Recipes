
const addIngredientsField = document.getElementById('addIngredientsField');

addIngredientsField.addEventListener('click', function (event) {
  event.preventDefault();
  const template = document.getElementById('ingredientsTemplate');
  var clon = template.content.cloneNode(true);
  document.getElementById('ingredients').appendChild(clon)
  console.log('Hello!');
})