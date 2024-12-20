"use client"

import React from "react";

interface IInputProps extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  error?: string
}

export const Input: React.FC<IInputProps> = ({label, error, ...props}) =>{
  return (
    <div className="w-full">
      <span className="flex flex-col">
        <label htmlFor={label} className="text-lg font-light">{label}</label>
        <input {...props} id={label} autoComplete={label}
          className= {`w-full border rounded-lg h-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${error? "border-red-500 ring-1 ring-red-500" : ""}`}
        />
      </span>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}