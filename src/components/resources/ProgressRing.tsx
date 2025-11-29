interface ProgressRingProps {
  score: number;
  size?: number;
}

const ProgressRing = ({ score, size = 120 }: ProgressRingProps) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  // Color based on score - greyscale
  const getColor = () => {
    if (score >= 90) return '#1f2937'; // darkest gray
    if (score >= 85) return '#4b5563'; // dark gray
    if (score >= 80) return '#6b7280'; // medium gray
    return '#9ca3af'; // light gray
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-primary">{score}</span>
      </div>
    </div>
  );
};

export default ProgressRing;
