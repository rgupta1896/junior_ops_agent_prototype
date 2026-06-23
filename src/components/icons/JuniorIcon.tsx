type JuniorIconProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-5 w-5 rounded-md",
  md: "h-8 w-8 rounded-lg",
  lg: "h-10 w-10 rounded-lg",
};

export function JuniorIcon({ className = "", size = "md" }: JuniorIconProps) {
  return (
    <img
      src="/brand/junior-ai.png"
      alt=""
      className={`object-contain ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
