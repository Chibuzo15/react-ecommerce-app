import React from 'react'
import classes from './button.module.css'

const button = (props) => {
    //{[classes['Button'], classes[props.btnType]].join(' ')}
    return (
        <button className={[classes['Button'], classes[props.btnType]].join(' ')}>
            {props.children}
        </button>
    )
}

export default button;