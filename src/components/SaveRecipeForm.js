import React, {Component} from 'react';


class IngredientForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            recipeName: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        
        this.setState({recipeName: event.target.value});
      }

    
      handleSubmit(event) {
        event.preventDefault();
        console.log(this.props)

        const name = this.state.recipeName
        if (!name){
            return
        }

        this.props.onSubmit({recipeName: name});

        this.setState({recipeName: ''});
        
      }



      render(){

        return (
            <form onSubmit={this.handleSubmit} >
              <div className="flex-container">
                  <div>
                      <input
                          onChange={this.handleInputChange}
                          className="input-name"
                          type="text"
                          id="save-recipe"
                          name="quantity"
                          placeholder="New Recipe Name"
                          value={this.state.recipeName}
                        />
                  </div>
                  <div>
                      <input type="submit" value="Save Recipe" />
                  </div>
              </div>
            </form>
        );
    }
  }

export default IngredientForm;