"use client";

import Image from "next/image";
import React from "react";
import { Control, useController } from "react-hook-form";

interface IThumbnail {
  name: string;
  control: Control<any>;
}

export const Thumbnail: React.FC<IThumbnail> = ({ name, control }) => {
  const [url, setUrl] = React.useState<string>();
  const inputRef = React.useRef();
  const { field, fieldState: { error } }= useController({ name, control });

  const onClick = () => {
    (inputRef.current as any)?.click();
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    field.onChange(file);
    if (!file) return setUrl("");
    setUrl(URL.createObjectURL(file));
  }

  return (
    <div>
      <label className="text-lg font-light">عکس</label>
      <div
        onClick={onClick}
        className= {`relative my-2 border rounded-md flex items-center justify-center h-52 hover:bg-slate-50 cursor-pointer ${error ? "border-red-400" : "border-slate-300"}`}>
        {!!url && (
          <Image
            src={url}
            fill={true}
            alt={"thumbnail"}
            className="object-cover object-center rounded-md"
          />
        )}
        <input
          onChange={onChange}
          ref={inputRef as any}
          type="file"
          className="hidden"
        />
        <p
          className={`text-xs font-medium ${error ? "text-red-400" : "text-slate-500"}`}>
          Select your thumbnail
        </p>
      </div>
      {!!error && (
        <p className="text-red-500 text-xs">{error.message}</p>
      )}
    </div>
  )
}