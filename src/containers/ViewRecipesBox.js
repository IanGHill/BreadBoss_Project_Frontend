import React, {Component} from 'react';
import RecipeDetail from './RecipeDetail';
import RecipeSelector from '../components/RecipeSelector';
import ImageComponent from '../components/ImageComponent';

class ViewRecipesBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            recipes: [],
            selectedRecipeId: 0
            
        };
        this.handleRecipeSelected = this.handleRecipeSelected.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:8080/recipes';
    
        fetch(url)
          .then(res => res.json())
          .then(recipes => this.setState({ recipes: recipes }))
          .catch(err => console.error);
      }

      handleRecipeSelected(recipeId) {
        this.setState({ selectedRecipeId: parseInt(recipeId) });
      }


    render() {
        
        const selectedRecipe = this.state.recipes.find(recipe => recipe.id === this.state.selectedRecipeId);

        return(
            <>
                <RecipeSelector recipes={this.state.recipes} onRecipeSelected={this.handleRecipeSelected}/>
                <RecipeDetail recipe = {selectedRecipe}/>
                <ImageComponent/>
            </>
        )
    }
}

export default ViewRecipesBox;