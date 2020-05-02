import React,{ Component } from 'react';
import classes from './Account.module.css';

// get our fontawesome imports
import { faShoppingBasket, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {showSearch} from '../../../store/actions'

class AccountBar extends Component{
    // state={
    //     showSearch: false
    // }

    // toggleSearch = () => {
    //     this.setState((prevState) => ({
    //         showSearch : !prevState.showSearch
    //     }))
    // }
    
    render(){
    let AccountLinks = <span style={{display:'flex'}}>
                <li
                onClick={() => {this.props.history.push('/login')}}
                >SIGN IN</li>
                <li
                onClick={() => {this.props.history.push('/cart')}}
                >CART</li>
            </span>
        //if user is logged in replace Sign Up button with My-account
        if(this.props.loggedIn){
            AccountLinks = <span style={{display:'flex'}}>
                    <li
                    onClick={() => {this.props.history.push('/my-account')}}
                    >MY ACCOUNT</li>
                    <li
                    onClick={() => {this.props.history.push('/cart')}}
                    >CART</li>
                </span>
        }

        return(
            <div className={classes['Wrapper']} >
                <ul className={classes['Accountbar']}>
                    {AccountLinks}
                </ul>
                <div className={classes['Accountbarmobile']}>
                    <FontAwesomeIcon 
                    onClick={this.props.onClickSearch}
                    className={classes['Icon']} 
                    icon={faSearch} />
                    <FontAwesomeIcon 
                    onClick={() => {this.props.history.push('/cart')}}
                    className={classes['Icon']} icon={faShoppingBasket} />
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn : state.loggedIn,
        showSearch : state.showSearch
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onClickSearch : () => dispatch(showSearch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountBar));