import React from 'react';
import './RecipeDelete.css';

const RecipeDelete = (props) => {

    function handleClick(){
        props.onDelete();
    }
    return(
        <div className="delete-button">
            <button type="button" id="recipe-delete" onClick={handleClick}>Delete Selected Recipe</button>   
        </div>     
    )
    
}

export default RecipeDelete;