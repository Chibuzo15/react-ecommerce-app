import React from 'react';
import classes from './Account.module.css';

// get our fontawesome imports
import { faShoppingBasket, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const accountBar = (props) => {
    return(
        <div className={classes['Wrapper']} >
            <ul className={classes['Accountbar']}>
                <li>SIGN IN</li>
                <li>CART</li>
            </ul>
            <div className={classes['Accountbarmobile']}>
                <FontAwesomeIcon className={classes['Icon']} icon={faSearch} />
                <FontAwesomeIcon className={classes['Icon']} icon={faShoppingBasket} />
            </div>
            
        </div>
    )
}

export default accountBar;