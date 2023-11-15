import React from "react";

function Input({ label, state, setState, placeholder, type }) {
  return (
    <div className=" mb-6">
      <p className="capitalize mb-2 text-base">{label}</p>
      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="border-0 border-b border-current w-[100%] p-2 pl-0 text-sm outline-none opacity-80 hover:opacity-100 transition-transform	"
      ></input>
    </div>
  );
}

export default Input;
