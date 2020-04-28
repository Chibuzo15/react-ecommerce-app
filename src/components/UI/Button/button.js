import React from 'react'
import classes from './button.module.css'

const button = () => {
    //{[classes['Button'], classes[props.btnType]].join(' ')}
    return (
        <button className={classes['Button']}>
            {props.children}
        </button>
    )
}

export default button;