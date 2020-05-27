import React, {Component} from 'react';
import './IngredientForm.css';


class IngredientForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            quantity: 0,
            ingredientID: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        
        this.setState({quantity: event.target.value});
      }

      handleSelectChange(event) {
       
        this.setState({ingredientID: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();

        const quantity = this.state.quantity;
        const ingredientID = this.state.ingredientID;
        if (!quantity || ! ingredientID){
            return
        }

        this.props.onSubmit({quantity: quantity, ingredientID: ingredientID});

        this.setState({quantity: 0, ingredientID: 0});
        
      }



      render(){

        const options = this.props.ingredients.map(ingredient => {
            return <option value={ingredient.id} key={ingredient.id}>{ingredient.name}</option>
          })

        return (
            <form onSubmit={this.handleSubmit} >
              <div className="flex-container">
                  <div>
                      <select id={this.props.dropdownID} onChange={this.handleSelectChange} name="ingredientID" value={this.state.ingredientID}>
                      <option value >{this.props.selectText}</option>
                      {options}
                      </select>
                  </div>
                  <div>
                      <label htmlFor="ingredient-quantity">Quantity(g):</label>
                      <input
                          onChange={this.handleInputChange}
                          className="input-box"
                          type="number"
                          id={this.props.inputID}
                          name="quantity"
                          value={this.state.quantity}
                        />
                  </div>
                  <div>
                      <input id={this.props.buttonID} type="submit" value={this.props.buttonText} />
                  </div>
              </div>
            </form>
        );
    }
  }

export default IngredientForm;