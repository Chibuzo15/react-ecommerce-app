import React from 'react';
import classes from './Account.module.css';

// get our fontawesome imports
import { faShoppingBasket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const accountBar = (props) => {
    return(
        <div>
            <ul className={classes['Accountbar']}>
                <li>SIGN IN</li>
                <li>VIEW CART</li>
            </ul>
            <div className={classes['Accountbarmobile']}>
                <FontAwesomeIcon className={classes['CartIcon']} icon={faSearch} />
                <FontAwesomeIcon className={classes['CartIcon']} icon={faShoppingBasket} />
            </div>
            
        </div>
    )
}

export default accountBar;