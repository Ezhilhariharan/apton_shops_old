import * as React from 'react'

const RightArrowIcon = props => {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: props.color }}
      {...props}
    >
      <path
        d="M1.66667 8.3335L5 5.00016L1.66667 1.66683"
        stroke="#4D4D4D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
};

export default RightArrowIcon
