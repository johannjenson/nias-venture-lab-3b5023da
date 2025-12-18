import { Link } from "react-router-dom";

interface NiasLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const NiasLogo = ({ className = "", variant = "dark" }: NiasLogoProps) => {
  const textColor = variant === "light" ? "text-background" : "text-foreground";
  
  return (
    <Link to="/" className={`flex flex-col items-start leading-none ${className}`}>
      <span 
        className={`font-bold text-2xl tracking-tight ${textColor}`}
        style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
      >
        NIAS
      </span>
      <span 
        className={`text-xs ${textColor} -mt-0.5`} 
        style={{ fontFamily: 'Arial, sans-serif', marginLeft: '0.15em' }}
      >
        نياس
      </span>
    </Link>
  );
};

export default NiasLogo;
