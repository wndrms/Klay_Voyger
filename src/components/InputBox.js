import classNames from "classnames";
import React, { useState } from "react";
import './InputBox.scss';

const InputBox = (props) => {
    const [tmp, settmp] = useState();
    const [Focus, setFocus] = useState(false);

    const onChange = event => {
        const {value} = event.target;
        settmp(value);
        console.log(tmp);
    }
    const onFocus = event => setFocus(!Focus);
    return (
        <div className="input-box-basic" style={{padding:props.padding}}>
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
                    onChange={onChange}
                    className={classNames("input-basic", {"focus" : Focus || tmp})}
                    onFocus={onFocus}
                    onBlur={onFocus}/>
                {props.symbol && 
                    <div>
                        <span className={classNames("symbol", {"insert": tmp})}>{props.symbol}</span>
                    </div>
                }
            </div>
            {props.error !== '0' &&
                <div className="error-box">
                    <span>{props.errorMessage}</span>
                </div>
            }
        </div>
    )
}

export default InputBox;