import classNames from "classnames";
import React from "react";
import './Button.scss';

const Button = ( props ) => {
    const onClick = () => {
        props.onError();
    }
    return (
        <div className={classNames("btn-basic", {"correct" : props.correct})}
            onClick={onClick}>
            <span className="btn-text">{props.text}</span>
        </div>
    )
}

export default Button;