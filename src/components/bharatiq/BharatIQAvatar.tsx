const BharatIQAvatar = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = { sm: "h-7 w-7 text-xs", md: "h-9 w-9 text-sm", lg: "h-12 w-12 text-base" };
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold relative`}>
      B
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-card animate-pulse-soft" />
    </div>
  );
};

export default BharatIQAvatar;
