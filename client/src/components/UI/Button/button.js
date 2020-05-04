import React from 'react'
import classes from './button.module.css'

const button = (props) => {
    //{[classes['Button'], classes[props.btnType]].join(' ')}
    return (
        <button 
        onClick={props.handleClick}
        disabled={props.disabled}
        className={[classes['Button'], classes[props.btnType]].join(' ')}>
            {props.children}
        </button>
    )
}

export default button;