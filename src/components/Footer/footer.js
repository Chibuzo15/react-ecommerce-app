import React from 'react';
import classes from './footer.module.css'
import FooterColumn from './footerColumn/footerColumn';

const footer = () => {
    const firstCol = [
        {
            name: 'About us',
        },
        {
            name: 'Contact Us'
        },
        {
            name: 'Work with us'
        }
    ]

    const scndColumn = [
        {
            name: 'WHAT\'S NEW',
        },
        {
            name: 'DRESSES'
        },
        {
            name: 'MEN'
        }
    ]

    const thirdColumn = [
        {
            name: 'FOLLOW US',
        },
        {
            name: '© URVAN HOLDINGS. '
        }
    ]


    return(
        <div className={classes['footer']}>
            <FooterColumn
            colitems = {firstCol}
            />
            <FooterColumn 
            colitems = {scndColumn}
            />
            <FooterColumn 
            colitems = {thirdColumn}
            />
        </div>
    )
}

export default footer;