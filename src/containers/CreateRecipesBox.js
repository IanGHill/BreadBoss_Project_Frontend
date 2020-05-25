import React, {Component} from 'react';
import IngredientForm from '../components/IngredientForm';


class CreateRecipesBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            levainRawMaterials: [],
            doughRawMaterials: [],
            recipeIngredients: [],
            levainIngredientId: 0,
                levainCategory: '',
                levainQuantity: 0,
                doughIngredientId: 0,
                doughCategory: '',
                doughQuantity: 0
            };
        this.handleLevainSubmit = this.handleLevainSubmit.bind(this)
        }
        
    

    componentDidMount() {
        const urlLevain = 'http://localhost:8080/raw_materials?type-in=Flour,Liquid,Starter,Yeast';
    
        fetch(urlLevain)
          .then(res => res.json())
          .then(rawMaterials => this.setState({ levainRawMaterials: rawMaterials}))
          .catch(err => console.error);
      
          const urlDough = 'http://localhost:8080/raw_materials?type-in=Flour,Liquid,Other,Yeast';
    
          fetch(urlDough)
            .then(res => res.json())
            .then(rawMaterials => this.setState({ doughRawMaterials: rawMaterials}))
            .catch(err => console.error);
      
    }
        
    handleLevainSubmit(data) {
        console.log(data);
       
        const foundIngredient = this.state.levainRawMaterials.find(element => element.id === parseInt(data.ingredientID));
        const tempArray = this.state.recipeIngredients.concat({
            category: 'Levain', quantity: parseInt(data.quantity), rawMaterial: foundIngredient});
        
        this.setState({recipeIngredients: tempArray});
    }

    handleDoughSubmit(data) {
        console.log(data);

        const foundIngredient = this.state.doughRawMaterials.find(element => element.id === parseInt(data.ingredientID));
        const tempArray = this.state.recipeIngredients.concat({
            category: 'Dough', quantity: parseInt(data.quantity), rawMaterial: foundIngredient});
        
        this.setState({recipeIngredients: tempArray});
    }

    render() {

        if (this.state.recipeIngredients){
            var totalDoughWeight = this.state.recipeIngredients.reduce((total, ingredient) => {
                return total + ingredient.quantity;
            },0);

            const levainIngredients = this.state.recipeIngredients.filter(ingredient => ingredient.category === "Levain");
            var totalLevainWeight = levainIngredients.reduce((total, ingredient) => {
            return total + ingredient.quantity;
            },0);
            var levainRows = levainIngredients.map(ingredient => { 
                return <tr key={'Levain' + ingredient.rawMaterial.id} value={ingredient.rawMaterial.id}>
                            <td>{ingredient.rawMaterial.name}</td>
                            <td>{ingredient.quantity}</td>
                            <td></td>
                            <td></td>
                        </tr>
            })

            const flourIngredients = this.state.recipeIngredients.filter(ingredient => ingredient.rawMaterial.type === "Flour");
            var totalFlour = flourIngredients.reduce((total, ingredient) => {
                return total + ingredient.quantity;
            },0);

            const liquidIngredients = this.state.recipeIngredients.filter(ingredient => ingredient.rawMaterial.type === "Liquid");
            const totalLiquid = liquidIngredients.reduce((total, ingredient) => {
                return total + ingredient.quantity;
            },0);
            var totalHydration = 0;
            if (totalFlour){totalHydration = (100*totalLiquid/totalFlour).toFixed(1);}
        };
        return(
            <>
                <h1>I am the create recipes box</h1>
                <table> 
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Base Recipe(g)</th>
                            <th>Bakers %</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr><th colSpan="4" className="tableSubHeading"><i>Levain</i></th></tr>
                    {levainRows}
                    
                    <tr><th colSpan="4" className="tableSubHeading"><i>Dough</i></th></tr>
                     <tr>
                        <td>Levain</td>
                        <td>{totalLevainWeight}</td>
                        <td>{totalFlour && (100*totalLevainWeight/totalFlour).toFixed(1)}</td>
                        <td></td>
                    </tr>
                    {/* {doughRows} */}
                    <tr>
                <td>Total Hydration</td>
                <td></td>
                <td>{totalHydration}%</td>
                <td></td>
              </tr>
              <tr>
                <td>Total Recipe</td>
                <td>{totalDoughWeight}</td>
                <td></td>
                <td></td>
              </tr>
                    </tbody>
              </table>
              <IngredientForm ingredients={this.state.levainRawMaterials}
                            onSubmit={this.handleLevainSubmit}
                            buttonText="Add to Levain"/>
                <IngredientForm ingredients={this.state.doughRawMaterials}
                            onSubmit={this.handleDoughSubmit}
                            buttonText="Add to Dough"/>
            
            </>
        )
    }
}

export default CreateRecipesBox;
