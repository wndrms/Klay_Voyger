import classNames from "classnames";
import React, { useState } from "react";
import './InputBox.scss';

const InputBox = (props) => {
    const [tmp, settmp] = useState(props.input);
    const [Focus, setFocus] = useState(false);

    const convert = (message) => {
        console.log(message);
        let test = message.replaceAll('\\n', '\n');
        console.log(test);
        return test
    }
    const onChange = event => {
        const {value} = event.target;
        settmp(value);
        props.onChange(value);
        console.log(tmp);
        console.log(convert(props.errorMessage));
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
                    value={props.input}
                    onChange={onChange}
                    className={classNames("input-basic", {"focus" : Focus || tmp})}
                    onFocus={onFocus}
                    onBlur={onFocus}/>
                {props.symbol && 
                    <div>
                        <span className={classNames("symbol", {"insert": Focus || tmp})}>{props.symbol}</span>
                    </div>
                }
            </div>
            <div className="error-box">
                {props.error && 
                    <span>{convert(props.errorMessage)}</span>
                }
            </div>
        </div>
    )
}

export default InputBox;