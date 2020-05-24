import React from 'react';

const RecipeDelete = (props) => {
    console.log(props);

    function handleClick(){
        props.onDelete();
    }
    return(
            <button type="button" onClick={handleClick}>Delete Selected Recipe</button>        
    )
    
}

export default RecipeDelete;