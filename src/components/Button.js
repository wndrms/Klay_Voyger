import React from "react";
import './Button.scss';

const Button = ( props ) => {
    return (
        <div className="btn-basic">
            <span className="btn-text">{props.text}</span>
        </div>
    )
}

export default Button;