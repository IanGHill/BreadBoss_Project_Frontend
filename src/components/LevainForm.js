import React, {Component} from 'react';


class LevainForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            levainQuantity: 0,
            ingredientID: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        console.log(event);
        this.setState({levainQuantity: event.target.value});
      }

      handleSelectChange(event) {
        console.log(event);
        this.setState({ingredientID: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({levainQuantity: 0, ingredientID: 0});
        
      }



      render(){

        const options = this.props.ingredients.map(ingredient => {
            return <option value={ingredient.id} key={ingredient.id}>{ingredient.name}</option>
          })

        return (
            <form >
                <div>
                    <select id="levain-selector" onChange={this.handleSelectChange} name="ingredientID" defaultValue="default">
                    <option disabled value="default">Select Ingredient</option>
                    {options}
                    </select>
                </div>
                <div>
                    <label htmlFor="levain-quantity">Quantity:</label>
                    <input
                        onChange={this.handleInputChange}
                        type="number"
                        id="levain-quantity"
                        name="levainQuantity"
                        // value={this.state.levainQuantity}
                       />
                </div>
                <div>
                    <input onClick={this.handleSubmit} type="submit" value="submit" />
                </div>
            </form>
        );
    }
  }

export default LevainForm;