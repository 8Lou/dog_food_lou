import React from "react";

import cn from "classnames";
import './index.css'
// @params type - primary , secondary

export const BaseButton = ({ type = 'primary', children, onClick = ()=>{} }) => {

    return (<button onClick={onClick} className={cn('btn', {
        'primary': type === 'primary',
        'secondary': type === 'secondary'
    })} >
        {children}</button>)
}