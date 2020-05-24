import React, {Component} from 'react';
import RecipeDetail from './RecipeDetail';
import RecipeSelector from '../components/RecipeSelector';
import ImageComponent from '../components/ImageComponent';
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
          .then(recipes => this.setState({ recipes: recipes }))
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
            .then(recipes => this.setState({ recipes: recipes }))
            .catch(err => console.error);
        
      }


    render() {

        const selectedRecipe = this.state.recipes.find(recipe => recipe.id === this.state.selectedRecipeId);
        // let selectedRecipe = {};
        // if (this.state.selectedRecipeId){
        //     selectedRecipe = this.state.recipes.find(recipe => recipe.id === this.state.selectedRecipeId);
        // } else {
        //     selectedRecipe = this.state.recipes.reduce(function(prev, current){
        //         return(prev.created > current.created) ? prev : current
        //     })

        //     this.setState({selectedRecipeId: selectedRecipe.id})
        // }

        return(
            <>
                <RecipeSelector recipes={this.state.recipes} onRecipeSelected={this.handleRecipeSelected}
                                selectedRecipeId={this.state.selectedRecipeId}/>
                {selectedRecipe && <RecipeDelete onDelete={this.handleDelete}/>}
                <RecipeDetail recipe = {selectedRecipe}/>
                <ImageComponent/>
            </>
        )
    }
}

export default ViewRecipesBox;