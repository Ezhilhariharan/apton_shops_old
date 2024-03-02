import * as React from 'react'

const WarningIcon = props => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="#181818"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 5.3335C9 5.88578 8.55228 6.3335 8 6.3335C7.44772 6.3335 7 5.88578 7 5.3335C7 4.78121 7.44772 4.3335 8 4.3335C8.55228 4.3335 9 4.78121 9 5.3335Z"
        fill="#181818"
      />
      <path
        d="M8 8V10.6667"
        stroke="#181818"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default WarningIcon
