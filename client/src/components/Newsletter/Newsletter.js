import React from 'react';
import classes from './Newsletter.module.css';
import Button from '../UI/Button/button';


const newsletter = () => {
    return(
        <div className={classes['NewsletterWrapper']}>
            <p>STAY UP TO DATE</p>
            <input 
            className={classes['NewsletterInput']}
            type='email' 
            name='email' 
            placeholder='Your email address' />
            <Button
            btnType='Newsletter'
            >Subscribe</Button>
        </div>
    )
}

export default newsletter;