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
    <div className="flex flex-col">
      {!!label && (
        <label className="text-slate-500 text-xs font-semibold">
          {label}
        </label>
      )}
      <textarea
        type="text"
        className= {`w-full border rounded-lg h-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${error? "border-red-500 ring-1 ring-red-500" : ""}`}
        {...props}
      />
      {!!error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}