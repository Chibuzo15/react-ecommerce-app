import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'

import Button from '../../../components/UI/Button/button';
import Input from '../../../components/UI/Input/Input';
import classes from './LoginPage.module.css';
import { NavLink } from 'react-router-dom'
import * as actions from '../../../store/actions/index'

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
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


    handleLogin = () => {
        const userObj = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.login(userObj)
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

        const message = <div className={classes.Message}>
            {this.props.location.state ? this.props.location.state.message : null}
        </div>

        let pageContent = <div className={classes.PageWrapper}>
            {message}
            {form}
            <div className={classes.Forgot}>
                <NavLink to='' > Forgot password </NavLink>
            </div>
            <Button
                handleClick={this.handleLogin}
                btnType='Cart'
            >
                SIGN IN
        </Button>
            <div
                className={classes.CreateNew}>
                <NavLink
                    to='/signup'
                >
                    Create new account?
            </NavLink>
            </div>
        </div>;

        if (this.props.loggedIn) {
            pageContent = <div className={classes.Success}>You are successfully logged In</div>
            const RedirectUrl = this.props.location.state ? this.props.location.state.redirect : '/';
            console.log('On login Page')
            console.log('url :', RedirectUrl)
            if(!this.props.location.state){
                console.log('Message and location state unknown')
            setTimeout(() => {
                return <Redirect to={RedirectUrl} />
            }, 3000);
           }
           return <Redirect to={RedirectUrl} />
        }

        return (
            pageContent
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.customer.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (userObj) => dispatch(actions.login(userObj))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));