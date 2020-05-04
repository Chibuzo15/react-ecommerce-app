import React from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import Button from '../../components/UI/Button/button';
import ContactData from './ContactData/ContactData';

const checkout = () => {
    return(
        <div>
            <OrderSummary/>
            <ContactData/>
        </div>
    )
}

export default checkout;