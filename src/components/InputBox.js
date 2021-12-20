import classNames from "classnames";
import React, { useState } from "react";
import './InputBox.scss';

const InputBox = (props) => {
    const [tmp, settmp] = useState();

    const onChange = event => {
        const {value} = event.target;
        settmp(value);
        console.log(tmp);
    }
    return (
        <div className="input-box-basic" style={{paddingTop:props.padding}}>
            <div className="input-text-area">
                <div className="input-title">
                    <span>{props.title}</span>
                </div>
                <div className="input-detail">
                    <span>{props.detail}</span>
                </div>
            </div>
            <div className="input-box-area">
                <input 
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={onChange}/>
                {props.symbol && 
                    <div>
                        <span className={classNames("symbol", {"insert": tmp})}>{props.symbol}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default InputBox;