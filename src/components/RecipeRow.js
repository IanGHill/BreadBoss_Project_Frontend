import React from 'react';

const RecipeRow = (props) => {
        return (
          <tr key={props.passedIngredient.id} value={props.passedIngredient.id}>
            <td>{props.passedIngredient.rawMaterial.name}</td>
            <td>{props.passedIngredient.quantity}</td>
            <td>{(100*props.passedIngredient.quantity/props.totalFlour).toFixed(1)}</td>
        {props.scaledRecipe && <td>{Math.round(props.passedIngredient.quantity*props.scalingFactor)}</td>}
        {props.scaledRecipe && (props.passedIngredient.rawMaterial.price ? <td>£{(props.passedIngredient.quantity*props.scalingFactor* props.passedIngredient.rawMaterial.price / props.passedIngredient.rawMaterial.packSize).toFixed(2)}</td> : <td>£0.00</td>)}
          </tr>
        )
}

export default RecipeRow;
   