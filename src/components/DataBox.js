import React from "react";
import "./DataBox.scss";

const DataBox = (props) => {
    return (
        <div className="DataBox-basic" style={{paddingTop:props.padding}}>
            <div className="DataBox-title">
                <span>{props.title}</span>
            </div>
            {props.detail && 
                <div className="DataBox-detail">
                    <span>{props.detail}</span>
                </div>
            }
            <div className="DataBox-area">
                <div className="Data-num">
                    <span>{props.pointer}</span>
                </div>
                <div className="symbol">
                    <span>{props.symbol}</span>
                </div>
            </div>
        </div>
    )
}

export default DataBox;