import React from 'react';
import './RecipeScalingInput.css';

const RecipeScalingInput = (props) => {

    function handleNumLoavesChange(event){
        props.onNumLoavesChange(event.target.value)
    }

    function handleDropWeightChange(event){
        props.onDropWeightChange(event.target.value)
    }

    return(
            <>    
            {/* <label htmlFor="numLoaves">Number of Loaves: </label> */}
            <input type="number" className="text-input" id="numLoaves" name="numLoaves" placeholder="# Loaves" onChange={handleNumLoavesChange} />
            <br/>
            {/* <label htmlFor="dropWeight">Drop Weight: </label> */}
            <input type="number" className="text-input" id="dropWeight" name="dropWeight" placeholder="Drop Weight" onChange={handleDropWeightChange}/>           
            </>
    )
    
}

export default RecipeScalingInput;