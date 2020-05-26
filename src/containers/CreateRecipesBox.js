import React, {Component} from 'react';
import IngredientForm from '../components/IngredientForm';
import SaveRecipeForm from '../components/SaveRecipeForm';


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
                doughQuantity: 0,
                savedRecipe: null,
                savedIngredient: null
            };
        this.handleLevainSubmit = this.handleLevainSubmit.bind(this);
        this.handleDoughSubmit = this.handleDoughSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

        const foundLevainIngredient = this.state.levainRawMaterials.find(element => element.id === parseInt(data.ingredientID));
        const tempLevainArray = this.state.recipeIngredients.concat({
            category: 'Levain', quantity: parseInt(data.quantity), rawMaterial: foundLevainIngredient});
        
        this.setState({recipeIngredients: tempLevainArray});
    }

    handleDoughSubmit(data) {

        const foundDoughIngredient = this.state.doughRawMaterials.find(element => element.id === parseInt(data.ingredientID));
        const tempDoughArray = this.state.recipeIngredients.concat({
            category: 'Dough', quantity: parseInt(data.quantity), rawMaterial: foundDoughIngredient});
        
        this.setState({recipeIngredients: tempDoughArray});
    }

    handleSave(data){

        var recipeToSave = { name: data.recipeName, type: 'Sourdough'};
        var recipeJson = JSON.stringify(recipeToSave);

        const url = 'http://localhost:8080/recipes/new';
        

        fetch(url, {method: 'POST', body: recipeJson, headers: {
        'Content-type': 'application/json'
        }})
        .then(res => res.json())
        .then(recipe => this.setState({ savedRecipe: recipe}, () => {
            this.createIngredients();
        }) )
        .catch(err => console.error);

    }

    createIngredients(){
        const newIngredientUrl = 'http://localhost:8080/ingredients/new';

        this.state.recipeIngredients.forEach(ingredient => {

            var newIngredient = {recipe: this.state.savedRecipe,
                                    rawMaterial: ingredient.rawMaterial,
                                    category: ingredient.category,
                                    quantity: ingredient.quantity};
                                          
             var newJsonIngredient = JSON.stringify(newIngredient);                          
            fetch(newIngredientUrl, {method: 'POST', body: newJsonIngredient, headers: {
                'Content-type': 'application/json'
                }})
                .then(res => res.json())
                .then(ingredient => this.setState({savedIngredient: ingredient}) )
                .catch(err => console.error);

        })
    }

    handleDelete(event){
        var searchCategory = '';
        var searchRawMaterialId;

        if (event.target.id[0] === 'L'){
            searchCategory = 'Levain';
            searchRawMaterialId = event.target.id.slice(6);
        } else{
            searchCategory = 'Dough';
            searchRawMaterialId = event.target.id.slice(5);
        }

        const foundElement = this.state.recipeIngredients.findIndex(ingredient => ingredient.rawMaterial.id === parseInt(searchRawMaterialId) && ingredient.category === searchCategory);
        var tempRecipeArray = this.state.recipeIngredients;
        tempRecipeArray.splice(foundElement,1);
        this.setState({recipeIngredients: tempRecipeArray});
    }

    render() {

        if (this.state.recipeIngredients){
            var totalDoughWeight = this.state.recipeIngredients.reduce((total, ingredient) => {
                return total + ingredient.quantity;
            },0);

            const flourIngredients = this.state.recipeIngredients.filter(ingredient => ingredient.rawMaterial.type === "Flour");
            var totalFlour = flourIngredients.reduce((total, ingredient) => {
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
                            <td>{totalFlour && (100*ingredient.quantity/totalFlour).toFixed(1)}%</td>
                            <td><button id={'Levain' + ingredient.rawMaterial.id} type="button" onClick={this.handleDelete}></button></td>
                        </tr>
            })

            const doughIngredients = this.state.recipeIngredients.filter(ingredient => ingredient.category === "Dough");

            var doughRows = doughIngredients.map(ingredient => { 
                return <tr key={'Dough' + ingredient.rawMaterial.id} value={ingredient.rawMaterial.id}>
                            <td>{ingredient.rawMaterial.name}</td>
                            <td>{ingredient.quantity}</td>
                            <td>{(100*ingredient.quantity/totalFlour).toFixed(1)}%</td>
                            <td><button type="button" onClick={this.handleDelete}></button></td>
                        </tr>
            })



            const liquidIngredients = this.state.recipeIngredients.filter(ingredient => ingredient.rawMaterial.type === "Liquid");
            const totalLiquid = liquidIngredients.reduce((total, ingredient) => {
                return total + ingredient.quantity;
            },0);
            var totalHydration = 0;
            if (totalFlour){totalHydration = (100*totalLiquid/totalFlour).toFixed(1);}
        };
        return(
            <>
                <h2>Build a new recipe</h2>
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
                        <td>{totalFlour && (100*totalLevainWeight/totalFlour).toFixed(1)}%</td>
                        <td></td>
                    </tr>
                    {doughRows}
                    <tr>
                        <td>Total Hydration</td>
                        <td></td>
                        <td>{totalHydration}%</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total Flour</td>
                        <td>{totalFlour}</td>
                        <td>{totalFlour && (100*totalFlour/totalFlour).toFixed(1)}%</td>
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
              <div>
              <div><IngredientForm ingredients={this.state.levainRawMaterials}
                            onSubmit={this.handleLevainSubmit}
                            selectText="Select Levain Ingredient"
                            buttonText="Add to Levain"/>
            </div>
                <IngredientForm ingredients={this.state.doughRawMaterials}
                            onSubmit={this.handleDoughSubmit}
                            selectText="Select Dough Ingredient"
                            buttonText="Add to Dough"/>
            </div>
            <div><SaveRecipeForm onSubmit={this.handleSave}/></div>


            
            </>
        )
    }
}

export default CreateRecipesBox;
