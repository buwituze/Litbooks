interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Loading spinner component
 */
export const LoadingSpinner = ({
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]} ${className}`}
    ></div>
  );
};

/**
 * Full page loading component
 */
export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

/**
 * Button loading component
 */
interface ButtonLoaderProps {
  text?: string;
}

export const ButtonLoader = ({ text = "Loading..." }: ButtonLoaderProps) => {
  return (
    <span className="flex items-center justify-center">
      <LoadingSpinner size="sm" className="mr-2" />
      {text}
    </span>
  );
};
