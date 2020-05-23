import React from 'react';

const RecipeScalingInput = (props) => {

    function handleNumLoavesChange(event){
        props.onNumLoavesChange(event.target.value)
    }

    function handleDropWeightChange(event){
        props.onDropWeightChange(event.target.value)
    }

    return(
            <>    
            <label htmlFor="numLoaves">Number of Loaves: </label>
            <input type="number" id="numLoaves" name="numLoaves" onChange={handleNumLoavesChange} />
            <br/>
            <label htmlFor="dropWeight">Drop Weight: </label>
            <input type="number" id="dropWeight" name="dropWeight" onChange={handleDropWeightChange}/>           
            </>
    )
    
}

export default RecipeScalingInput;