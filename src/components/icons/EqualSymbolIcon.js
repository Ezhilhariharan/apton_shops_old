import React from "react";

const EqualSymbolIcon = props => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3 15H21" stroke={props.appearance === "table" ? "#4AACEA" : "#4D4D4D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 9H21" stroke={props.appearance === "table" ? "#4AACEA" : "#4D4D4D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default EqualSymbolIcon;