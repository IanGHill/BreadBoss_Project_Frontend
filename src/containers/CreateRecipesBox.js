import React, {Component} from 'react';
import './RecipeDetail.css';


class CreateRecipesBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            recipes: [],
            selectedRecipeId: 0
            
        };
   
    }

    componentDidMount() {
        const url = 'http://localhost:8080/recipes';
    
        fetch(url)
          .then(res => res.json())
          .then(recipes => this.setState({ recipes: recipes, selectedRecipeId: recipes[0].id }))
          .catch(err => console.error);
      }


    render() {

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
                <h1>I am the create recipes box</h1>
            </>
        )
    }
}

export default CreateRecipesBox;
