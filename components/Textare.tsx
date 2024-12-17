"use client";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<IInput> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      {!!label && (
        <label className="text-slate-500 text-xs capitalize font-semibold">
          {label}
        </label>
      )}
      <textarea
        type="text"
        className={`border  rounded-md py-1 px-2 hover:outline focus:outline placeholder:text-xs placeholder:font-medium ${error ? "border-red-400 outline-red-400 placeholder:text-red-400" : "border-slate-300 outline-slate-200 placeholder:text-slate-400"}`}
        {...props}
      />
      {!!error && (
        <p className="text-red-400 text-xs font-semibold capitalize">{error}</p>
      )}
    </div>
  )
}