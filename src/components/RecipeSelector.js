import React from 'react';

const RecipeSelector = (props) => {
  const options = props.recipes.map(recipe => {
    return <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
  })

  function handleChange(event) {
    event.preventDefault();
    props.onRecipeSelected(event.target.value);
  }

  return (
    <div className="center">
      <select id="recipe-selector" onChange={handleChange} defaultValue="default">
        <option disabled value="default">Choose a recipe...</option>
        {options}
      </select>
    </div>
  )
}

export default RecipeSelector;