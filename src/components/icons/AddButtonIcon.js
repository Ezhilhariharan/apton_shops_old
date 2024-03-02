import * as React from 'react'

const AddButtonIcon = props => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="20"
        cy="20"
        r="19.5"
        fill="white"
        stroke="#D9D9D9"
        strokeDasharray="2 2"
      />
      <path
        d="M26 20H14"
        stroke="#D9D9D9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 14V26"
        stroke="#D9D9D9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AddButtonIcon
