const CustomCheckBox = () => {
  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        className="appearance-none cursor-pointer h-4 w-4 border-[1.45px] mt-2 rounded-sm
         border-ch-light-mode-neutral-500 hover:bg-ch-light-mode-neutral-300
         checked:bg-ch-teal-700 checked:border-transparent checked:hover:bg-ch-teal-800
           focus:outline-3 focus:outline-white focus:ring-5 focus:ring-ch-teal-700
         dark:border-ch-dark-mode-neutral-300 dark:hover:bg-ch-dark-mode-neutral-600
         dark:checked:bg-ch-teal-700 dark:checked:border-ch-dark-mode-neutral-400 dark:checked:hover:bg-ch-teal-800
           dark:focus:outline-3 dark:focus:outline-ch-dark-neutral-800 dark:focus:ring-5 dark:focus:ring-ch-dark-mode-neutral-100
           peer"
      />
      <svg
        className="absolute left-0 top-2 hidden peer-checked:block pointer-events-none"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z"
          fill="#014745"
        />
        <path
          d="M12 5L6.5 10.5L4 8"
          stroke="white"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default CustomCheckBox
