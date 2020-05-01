import React from 'react';
import classes from './footerColumn.module.css';
import FooterItem from '../footerItem/footerItem';

const footerColumn = (props) => {
    
    const column = props.colitems.map(item => {
            return <FooterItem key={item.name}>{item.name}</FooterItem>
        })
    return (
        <div className={classes['footerColumn']}>
            {column}
        </div>
    )
}

export default footerColumn;