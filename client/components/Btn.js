import React from "react";

export default function CustomBtn(props){
    return(
        <button onClick={props.click} className={props.class}>{props.text}</button>
    )
}