import React, { Component } from 'react';
import classes from './PaystackForm'
import PaystackButton from 'react-paystack';
import { withRouter } from 'react-router-dom';

class PaystackForm extends Component {
    state = {
        key: "pk_test_8dcba9bc99e7c09c86f03363e0f34a0b8cb88496", //PAYSTACK PUBLIC KEY
        email: this.props.email,  // customer email
        amount: this.props.amount //equals NGN100,
    }

    callback = (response) => {
        console.log('This is the response', response); // card charged successfully, get reference here
        if(response.status === "success"){
            alert('Transaction successful')
        }
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    render() {
        return (
            <div className={classes.FormWrapper}>
                <div className={classes.Form}>
                    <PaystackButton
                        text="Make Payment"
                        className="Form"
                        callback={this.callback}
                        close={this.close}
                        disabled={true}
                        embed={true}
                        reference={this.getReference()}
                        email={this.state.email}
                        amount={this.state.amount}
                        paystackkey={this.state.key}
                        tag="button"
                    />
                </div>

            </div>
        )
    }
}

export default withRouter(PaystackForm);