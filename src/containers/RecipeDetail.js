import React, {Component} from 'react';
import './RecipeDetail.css';
import RecipeRow from '../components/RecipeRow';
import RecipeScalingSwitch from '../components/RecipeScalingSwitch';
import RecipeScalingInput from '../components/RecipeScalingInput';
import ImageComponent from '../components/ImageComponent';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scaleRecipe: false,
      numLoaves: 0,
      dropWeight: 0
          
    };

    this.handleNumLoavesInput = this.handleNumLoavesInput.bind(this)
    this.handleDropWeightInput = this.handleDropWeightInput.bind(this)

  }

  handleNumLoavesInput(amount){
    if (amount){
      this.setState({numLoaves: parseInt(amount)})
    } else {
        this.setState({numLoaves: 0})
    }
  }

  handleDropWeightInput(amount){
    if (amount){
      this.setState({dropWeight: parseInt(amount)})
    } else{
        this.setState({dropWeight: 0})
    }
  }

  render() {

    if (this.props.recipe){
      
      const totalDoughWeight = this.props.recipe.ingredients.reduce((total, ingredient) => {
        return total + ingredient.quantity;
      },0);

      const scalingFactor = this.state.numLoaves*this.state.dropWeight/totalDoughWeight;

      let totalScaledBatchCost = 0;
      let totalScaledLevainCost = 0;
      let costPerLoaf = 0;
      this.props.recipe.ingredients.forEach(ingredient => {
        if (ingredient.rawMaterial.packSize){
          totalScaledBatchCost += (ingredient.quantity * scalingFactor * ingredient.rawMaterial.price / ingredient.rawMaterial.packSize)
        }
      });

      if (this.state.numLoaves){
        costPerLoaf = totalScaledBatchCost / this.state.numLoaves;
      }

      const flourIngredients = this.props.recipe.ingredients.filter(ingredient => ingredient.rawMaterial.type === "Flour");
      const totalFlour = flourIngredients.reduce((total, ingredient) => {
        return total + ingredient.quantity;
      },0);

      const liquidIngredients = this.props.recipe.ingredients.filter(ingredient => ingredient.rawMaterial.type === "Liquid");
      const totalLiquid = liquidIngredients.reduce((total, ingredient) => {
        return total + ingredient.quantity;
      },0);
      const totalHydration = (100*totalLiquid/totalFlour).toFixed(1);

      const levainIngredients = this.props.recipe.ingredients.filter(ingredient => ingredient.category === "Levain");
      const totalLevainWeight = levainIngredients.reduce((total, ingredient) => {
        return total + ingredient.quantity;
      },0);
     
      levainIngredients.forEach(ingredient => {
        if (ingredient.rawMaterial.packSize){
          totalScaledLevainCost += (ingredient.quantity * scalingFactor * ingredient.rawMaterial.price / ingredient.rawMaterial.packSize)
        }
      });
      
      const levainRows = levainIngredients.map(ingredient => { 
        return <RecipeRow passedIngredient={ingredient}
          totalFlour={totalFlour}
          scaledRecipe={this.state.scaleRecipe}
          scalingFactor={scalingFactor}
          key={ingredient.id} value={ingredient.id}/>
      })
      const doughIngredients = this.props.recipe.ingredients.filter(ingredient => ingredient.category === "Dough");
      const doughRows = doughIngredients.map(ingredient => {
        return <RecipeRow passedIngredient={ingredient}
                          totalFlour={totalFlour}
                          scaledRecipe={this.state.scaleRecipe}
                          scalingFactor={scalingFactor}
                          key={ingredient.id} value={ingredient.id}/>
      })

    return (
      <>
      
      <div className="main-container">
    
        <div className="flex-item main-left">
          <h2>{this.props.recipe.name}</h2>
          <table> 
            <thead>
              <tr className="table-header-row">
                <th>Ingredient</th>
                <th>Base Recipe(g)</th>
                <th>Bakers %</th>
                {this.state.scaleRecipe && <th>Scaled Batch(g)</th>}
                {this.state.scaleRecipe && <th>Cost</th>}
              </tr>
            </thead>
            <tbody>
              <tr><th colSpan="4" className="tableSubHeading"><i>Levain</i></th></tr>
              {levainRows}
      
              <tr><th colSpan="9" className="tableSubHeading"><i>Dough</i></th></tr>
              <tr className="table-levain-row">
                <td>Levain</td>
                <td>{totalLevainWeight}</td>
                <td>{(100*totalLevainWeight/totalFlour).toFixed(1)}</td>
                {this.state.scaleRecipe && <td>{Math.round(totalLevainWeight*scalingFactor)}</td>}
                {this.state.scaleRecipe && <td>£{totalScaledLevainCost.toFixed(2)}</td>}
              </tr>
              {doughRows}
              </tbody>
              <tfoot>
              <tr className="table-footer-row">
                <td>Total Hydration</td>
                <td></td>
                <td>{totalHydration}%</td>
                {this.state.scaleRecipe && <td></td>}
                {this.state.scaleRecipe && <td></td>}
              </tr>
              <tr className="table-footer-row">
                <td>Total Recipe</td>
                <td>{totalDoughWeight}</td>
                <td></td>
                {this.state.scaleRecipe && <td>{this.state.numLoaves*this.state.dropWeight}</td>}
                {this.state.scaleRecipe && <td>£{totalScaledBatchCost.toFixed(2)}</td>}
              </tr>
            </tfoot>
          </table>
          <div className="flex-container">
            <p className="ingredient-cost">Scale?</p>
            <RecipeScalingSwitch
              isOn={this.state.scaleRecipe}
              onColor="silver"
              handleToggle={() => this.setState({scaleRecipe: !this.state.scaleRecipe})}
            />
            
            {this.state.scaleRecipe && <RecipeScalingInput onNumLoavesChange={this.handleNumLoavesInput}
                                                          onDropWeightChange={this.handleDropWeightInput}/>}
            {this.state.scaleRecipe && <p className="ingredient-cost">Ingredient cost/loaf = £{costPerLoaf.toFixed(2)}</p>}
          </div>
        </div>
        <div className="flex-item main-right">
          <ImageComponent url = {this.props.recipe.imageUrl ? this.props.recipe.imageUrl : 'wheatfields.jpg' }/>
        </div>
      </div>
      </>
    );
  } else {return (
    <h2>Loading</h2>
  )}
}
}

export default RecipeDetail;