import React from "react";
import classNames from "classnames";

function Button({ color = "white", onClick, text, disabled }) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        color === "blue" &&
          "bg-blue-700  text-white text-center  m-4  p-2 border-solid border-current border-2 rounded  hover:bg-white hover:text-blue-600 transition-transform cursor-pointer flex items-center justify-center h-auto text-sm",
        color === "white" &&
          "text-blue-600 text-center  m-4  p-2 bg-white border-solid border-current border-2 rounded cursor-pointer flex items-center justify-center h-auto text-sm hover:bg-blue-600 hover:text-white"
      )}
      disabled={disabled}
    >
      {text}
    </div>
  );
}

export default Button;
