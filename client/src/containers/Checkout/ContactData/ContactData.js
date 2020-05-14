import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/button';
import classes from './ContactData.module.css'
// import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import PaystackForm from '../../../components/Paystack/PaystackForm';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIPCODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formisvalid: false,
        showPaystack: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        let products = null;
        if(this.props.cartData.cartItems){
            products = this.props.cartData.cartItems.map(product => {
                return {
                    id: product.id,
                    quantity: product.quantity
                }
            })
        }
        

        const order = {
            products: products,
            price: this.props.totalPrice,
            userData: formData,
            order_status: 'pending'
        }
        this.props.onOrder(order, this.props.customerToken)

        this.setState(prevState => ({
            showPaystack: true
          }));
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
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
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //get the particular form currently editted(e.g name, address, country)
        //stored in updatedFormElement OBJECT
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        //input the entered value from the event argument, into th
        // and store that value in the updatedFormElement object
        updatedFormElement.value = event.target.value;

        //also update validity of entry , true or false
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        //if user has changed input content , then set touched state to true
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formisValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formisValid = updatedOrderForm[inputIdentifier].valid && formisValid;
        }

        this.setState({ orderForm: updatedOrderForm, formisvalid: formisValid })

    }

    render() {
        
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let payStack = null;
        if (this.state.showPaystack) {
            payStack = <PaystackForm
                email={this.state.orderForm.email.value}
                amount={this.props.totalPrice * 100}
            />
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
                > PROCEED TO PAYMENT </Button>
            </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }


        return (
            <div className={classes['ContactData']}>
                <h4>Enter your Contact Data</h4>
                {form}
                {payStack}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData, token) => dispatch(actions.order(orderData, token))
    }
}

const mapStateToProps = state => {
    return {
        cartData: state.cart.cartData,
        totalPrice: state.cart.totalPrice,
        customerToken: state.customer.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);