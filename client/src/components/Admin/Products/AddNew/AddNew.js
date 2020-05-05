import React, { Component } from 'react';
import classes from './AddNew.module.css';
import * as actions from '../../../../store/actions/index';
import Button from '../../../UI/Button/button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';

import { connect } from 'react-redux';

class AddNew extends Component {
    state = {
        productForm : {
            product_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Product price'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Product description'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            }
        },
        formisvalid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElementIdentifier in this.state.productForm){
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }
        
            const productToAdd = {
                name: formData.product_name,
                price: formData.price,
                description: formData.description
            }

        this.props.onAddProduct(productToAdd)   
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //create new object from OrderForm in this.state
        const updatedProductForm = {
            ...this.state.productForm
        }
        //get the particular form currently editted(e.g name, address, country)
        //stored in updatedFormElement OBJECT
        const updatedFormElement = {
            ...updatedProductForm[inputIdentifier]
        }
        //input the entered value from the event argument, into th
        // and store that value in the updatedFormElement object
        updatedFormElement.value = event.target.value;
        
        //also update validity of entry , true or false
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        //if user has changed input content , then set touched state to true
        updatedFormElement.touched = true;
        updatedProductForm[inputIdentifier] = updatedFormElement;
       
        let formisValid = true;
        for(let inputIdentifier in updatedProductForm){
            formisValid = updatedProductForm[inputIdentifier].valid && formisValid; 
        }

        this.setState({productForm: updatedProductForm, formisvalid: formisValid})

    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.productForm){
            formElementsArray.push({
                id : key,
                config: this.state.productForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    />    
                ))}
                <Button btnType="Success" 
                handleClick={this.orderHandler}
                btnType='Cart'
                disabled={!this.state.formisvalid}
                > ADD PRODUCT </Button>
            </form>);
        if (this.props.loading){
            form = <Spinner/>;
        }


        return (
            <div>
                <div className={classes.Title}>Add new Product</div>
                {form}
            </div>
        )
    }
}
// const addNew = (props) => {
//     const productData = {
//         
//     }
    
// }

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProduct : (product) => dispatch(actions.addProduct(product))
    }
}

export default connect(null, mapDispatchToProps)(AddNew);