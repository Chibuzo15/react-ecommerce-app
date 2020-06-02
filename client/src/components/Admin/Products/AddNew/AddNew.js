import React, { Component } from 'react';
import classes from './AddNew.module.css';
import * as actions from '../../../../store/actions/index';
import Button from '../../../UI/Button/button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AdminSideWrapper from '../../AdminSideWrapper/AdminSideWrapper';

class AddNew extends Component {
    state = {
        productForm: {
            product_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Product price'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Product description',
                    style: { height: '150px' }
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formisvalid: false,
        file: null
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElementIdentifier in this.state.productForm) {
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }

        const productToAdd = {
            name: formData.product_name,
            image_id: this.props.image_id,
            price: formData.price,
            description: formData.description
        }

        this.props.onAddProduct(productToAdd)
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
        if (this.props.image_id) {
            isValid = true
        }else{
            isValid = false
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
        for (let inputIdentifier in updatedProductForm) {
            formisValid = updatedProductForm[inputIdentifier].valid && formisValid;
        }

        this.setState({ productForm: updatedProductForm, formisvalid: formisValid })

    }

    onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        this.setState({file})
        this.props.onUploadImage(file)
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.productForm) {
            formElementsArray.push({
                id: key,
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
        if (this.props.loading) {
            form = <Spinner />;
        }
        
        //formatting base url for node server , which is used to serve product images
        const public_url = window.location.origin.toString();

        let baseUrl = "https://protected-springs-06155.herokuapp.com/";
        if (public_url.includes("localhost")){
            baseUrl = "http://localhost:5000/";
        }

        let image_url = null
        if(this.props.image_url){
            image_url = baseUrl + 'images' + this.props.image_url.replace('--', '_sm')
        }
        
        return (
            <AdminSideWrapper>
            <div>
                <div className={classes.Title}>Add new Product</div>
                <input type="file"
                        name="product_image"
                        ref={(ref) => this.fileUploader = ref}
                        style={{ display: "none" }}
                        onChange={this.onChangeFile}
                    />
                <div className={classes.Select_Image}
                onClick = {()=>{this.fileUploader.click()}}
                >
                    Select an Image
                    
                </div>
                <div>
                    {this.state.file ? this.state.file.name : null }
                </div>
                <div>
                    {this.props.image_url ? 
                    <img src={image_url} alt="uploaded image" />
                     : null}
                </div>
                {form}
                <div className={classes.View}>
                    <Button
                        handleClick={() => this.props.history.push('/site-admin/products')}
                    >
                        VIEW ALL PRODUCTS
                    </Button>
                </div>

            </div>
            </AdminSideWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        image_url : state.products.uploaded_image_url,
        image_id : state.products.uploaded_image_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProduct: (product) => dispatch(actions.addProduct(product)),
        onUploadImage: (image) => dispatch(actions.uploadProductImage(image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNew));