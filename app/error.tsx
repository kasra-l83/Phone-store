"use client";

const ErrorBoundary: React.FC<{ error: Error & { digest?: string } }> = (props) =>{
  return (
    <div>
      Error!
      <p>{props.error.message}</p>
      <p>{props.error.stack}</p>
    </div>
  )
}
export default ErrorBoundary;