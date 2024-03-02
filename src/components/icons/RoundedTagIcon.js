import React from "react";

const RoundedTagIcon = props => {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="15" cy="15" r="15" fill="#3771C8" fill-opacity="0.1" />
            <path d="M9.68941 15.3463L14.6541 20.3109C14.9144 20.5713 15.3365 20.5713 15.5969 20.3109L20.3109 15.5969C20.5713 15.3365 20.5713 14.9144 20.3109 14.6541L15.3463 9.68941C15.2064 9.5495 15.0115 9.47897 14.8145 9.49688L10.4933 9.88972C10.1728 9.91886 9.91885 10.1728 9.88972 10.4933L9.49688 14.8145C9.47897 15.0115 9.5495 15.2064 9.68941 15.3463Z" stroke="#3771C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.334 12.3335H12.3353V12.3348H12.334V12.3335Z" stroke="#3771C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default RoundedTagIcon;