import React from 'react';
import FormComponent from '../components/FormComponent';
import ControlComponent from '../components/ControlComponent';
import ImageComponent from '../components/ImageComponent';

class BreadContainer extends React.Component {
    constructor(props){
        super(props);
        this.state= {

            scaleRecipe: false,
            scaledLoaves: 0,
            scaledWeight: 0,
            costRecipe: false
        };
        // this.handleSalary1Input = this.handleSalary1Input.bind(this);
    }

    handleSalary1Input(amount){
        this.setState({salary1: parseFloat(amount)})
    }


    render() {
        return(
            <>
                <ControlComponent/>
                <FormComponent />
                <ImageComponent/>
            </>
        )
    }
}

export default BreadContainer;