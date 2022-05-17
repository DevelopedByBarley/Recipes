document.querySelectorAll('.deleteRecipe').forEach((btn) => {
  btn.addEventListener('click', async (event) => {
    let id = {
      id: event.target.dataset.id
    }

    try {
      await fetch('/recipes/recipe', {
        method: 'DELETE',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(id)
        
      })
      window.location.assign('/recipes')
    } catch (error) {
      window.location.assign('/')
      console.log(error)
    }

  })
})

