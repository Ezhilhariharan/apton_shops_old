import React from "react";

const CloseCircleAddCustomer = props => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="20" cy="20" r="20" fill="#DA001A" fill-opacity="0.1" />
            <path d="M24 24L16 16" stroke="#DA001A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 16L16 24" stroke="#DA001A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default CloseCircleAddCustomer;