import React from 'react';

const AddLevel = ({ fill }) => {
  //   const { fill } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5H13.423L14.577 7H19V16H13L11.845 14H6V21H5V5ZM18 15V8H14L12.845 6H6V13H12.423L13.577 15H18Z"
        fill={fill}
      />
    </svg>
  );
};

export default AddLevel;
