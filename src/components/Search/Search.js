import React from 'react';
import classes from './Search.module.css';

import { connect } from 'react-redux';
import { showSearch } from '../../store/actions';

const search = (props) => {
    let attachClasses = classes.Search
    //should search show
    if(props.show){
        attachClasses = [classes['Search'], classes['ShowSearch']].join(' ');
    }

    return(
        <div className={attachClasses} >
            <div
            className={classes.closeButton}
            onClick = {props.showSearch}
            >x</div>
            <input type='text' name='search' placeholder='Enter search term' />
        </div>
    )
}

const mapDispatchToProps = {
    showSearch
}

export default connect(null, mapDispatchToProps)(search);