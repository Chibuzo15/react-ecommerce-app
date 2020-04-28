import React from 'react';
import classes from './footer.module.css'
import FooterColumn from './footerColumn/footerColumn';
import Logo from '../Header/Logo/Logo';

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
        <div className={classes['footerWrapper']}>
            <Logo/>
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
        </div>
    )
}

export default footer;