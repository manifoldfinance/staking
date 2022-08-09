interface ErrorProps {
  code?: number
  message: string
}

export const Error: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <div className="center-vertical-screen space-y-5">
      <img
        className="h-28 sm:h-48 dark:invert"
        alt=""
        src="/logo.svg"
      />
      <div className="text-center space-y-1">
        <h1 className="text-4xl">{code}</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}