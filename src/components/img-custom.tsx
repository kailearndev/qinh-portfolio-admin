import { useState } from "react";

type ImageComponentProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  className?: string;
};
const ImageComponent = ({
  fallbackSrc,
  className,
  ...props
}: ImageComponentProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-6 h-6 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
        </div>
      )}

      <img
        {...props}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        src={error && fallbackSrc ? fallbackSrc : props.src}
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};
export default ImageComponent;
