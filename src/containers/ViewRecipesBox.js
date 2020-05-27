import React, {Component} from 'react';
import RecipeDetail from './RecipeDetail';
import RecipeSelector from '../components/RecipeSelector';
import RecipeDelete from '../components/RecipeDelete';

class ViewRecipesBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            recipes: [],
            selectedRecipeId: 0
            
        };
        this.handleRecipeSelected = this.handleRecipeSelected.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:8080/recipes';
    
        fetch(url)
          .then(res => res.json())
          .then(recipes => this.setState({ recipes: recipes, selectedRecipeId: recipes[0].id }))
          .catch(err => console.error);
      }

      handleRecipeSelected(recipeId) {
        this.setState({ selectedRecipeId: parseInt(recipeId) });
      }

      handleDelete(){
          

          const url = 'http://localhost:8080/recipes/delete/' + this.state.selectedRecipeId.toString();
          this.setState({selectedRecipeId: 0});
          console.log(url);

            fetch(url, {method: 'DELETE'})
            .then(res => res.json())
            .then(recipes => this.setState({ recipes: recipes, selectedRecipeId: recipes[0].id }) )
            .catch(err => console.error);
        
      }


    render() {

        const selectedRecipe = this.state.recipes.find(recipe => recipe.id === this.state.selectedRecipeId);

        return(
            <>
                <RecipeSelector recipes={this.state.recipes} onRecipeSelected={this.handleRecipeSelected}
                                selectedRecipeId={this.state.selectedRecipeId}/>
                <RecipeDetail recipe = {selectedRecipe}/>
                {selectedRecipe && (this.state.recipes.length >1) && <RecipeDelete onDelete={e =>
        window.confirm("Are you sure you wish to delete this recipe?") &&
        this.handleDelete(e)}/>}
            </>
        )
    }
}

export default ViewRecipesBox;