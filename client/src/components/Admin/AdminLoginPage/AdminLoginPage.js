import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import classes from './AdminLoginPage.module.css';

import Button from '../../UI/Button/button';
import Input from '../../UI/Input/Input';

import * as actions from '../../../store/actions/index';

class AdminLogin extends Component {
    state = {
        userForm: {

        },
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }

    submitHandler = (e) => {
        e.preventDefault()
        const userObj = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onAdminLogin(userObj)
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
            return <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        })

        return (

            <div className={classes.Wrapper}>
                {this.props.adminLoggedIn ? <Redirect to='/site-admin' /> : null}
                <form className={classes.Form}>
                    <div className={classes.Title}>Admin Login</div>
                    {form}
                    <Button
                        handleClick={this.submitHandler}
                        btnType="Success" > SUBMIT </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminLoggedIn: state.auth.adminLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminLogin: (userObj) => dispatch(actions.adminLogin(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);