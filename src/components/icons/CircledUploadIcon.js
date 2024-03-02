import React from "react";

const CircleUploadIcon = props => {
    return (
        <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g filter="url(#filter0_di_3779_13845)">
                <circle cx="39" cy="39" r="25" fill="white" />
            </g>
            <path d="M34 46H33C30.2386 46 28 43.7614 28 41C28 38.35 30.0616 36.1814 32.6685 36.0108C33.7898 33.64 36.2033 32 39 32C42.5267 32 45.4442 34.608 45.9292 38.0006C45.9528 38.0002 45.9764 38 46 38C48.2091 38 50 39.7909 50 42C50 44.2091 48.2091 46 46 46H44" stroke="#4AACEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M42 40L39 37M39 37L36 40M39 37L39 45" stroke="#4AACEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <filter id="filter0_di_3779_13845" x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="7" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3779_13845" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3779_13845" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2.5" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_3779_13845" />
                </filter>
            </defs>
        </svg>

    )
}

export default CircleUploadIcon;