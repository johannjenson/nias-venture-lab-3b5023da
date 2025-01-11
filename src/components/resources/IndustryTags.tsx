import { Badge } from "@/components/ui/badge";

interface IndustryTagsProps {
  title: string;
  tags: string[];
  variant?: "secondary" | "outline";
  onTagClick: (tag: string) => void;
}

const IndustryTags = ({ title, tags, variant = "secondary", onTagClick }: IndustryTagsProps) => {
  const getTagClassName = () => {
    if (variant === "secondary") {
      return "bg-secondary text-primary cursor-pointer hover:bg-secondary/80 transition-colors";
    }
    return "border-primary/20 text-primary cursor-pointer hover:bg-primary/5 transition-colors";
  };

  return (
    <div className="mt-4">
      <div className="text-sm font-medium text-gray-500 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            variant={variant} 
            className={getTagClassName()}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default IndustryTags;