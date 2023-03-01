import React from "react";

function Input({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = true,
  className,
}) {
  return (
    <div className={`w-full ${className}`}>
      <p className="font-medium">{label}</p>
      <div className="bg-gradient-to-r from-[#575A70]/20 to-[#575A70]/20 w-full rounded-md mt-2">
        <input
          type={type}
          className={`py-2 px-4 w-full rounded outline-none bg-black/20 text-white`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
}

export default Input;
