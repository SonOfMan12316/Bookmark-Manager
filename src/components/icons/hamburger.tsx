const Hamburger = ({ ...props }) => {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 1H32C36.1421 1 39.5 4.35786 39.5 8.5V32.5C39.5 36.6421 36.1421 40 32 40H8C3.85786 40 0.5 36.6421 0.5 32.5V8.5C0.5 4.35786 3.85786 1 8 1Z"
        fill="white"
      />
      <path
        d="M8 1H32C36.1421 1 39.5 4.35786 39.5 8.5V32.5C39.5 36.6421 36.1421 40 32 40H8C3.85786 40 0.5 36.6421 0.5 32.5V8.5C0.5 4.35786 3.85786 1 8 1Z"
        stroke="#C0CFCC"
      />
      <path
        d="M12.5 20.5H27.5M12.5 15.5H27.5M12.5 25.5H27.5"
        stroke="#051513"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Hamburger
