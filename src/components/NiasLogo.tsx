import { Link } from "react-router-dom";

interface NiasLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const NiasLogo = ({ className = "", variant = "dark" }: NiasLogoProps) => {
  const textColor = variant === "light" ? "text-background" : "text-foreground";
  
  return (
    <Link to="/" className={`flex flex-col items-start leading-none ${className}`}>
      <span className={`font-sans font-bold text-xl tracking-tight ${textColor}`}>
        NIAS
      </span>
      <span className={`font-sans text-sm ${textColor}`} style={{ fontFamily: 'Arial, sans-serif' }}>
        نياس
      </span>
    </Link>
  );
};

export default NiasLogo;
