import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const SearchAndFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }: SearchAndFilterProps) => {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-1">
        <Input
          placeholder="Search industries, descriptions, key areas, or industry leaders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Select
        value={sortBy}
        onValueChange={setSortBy}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="score">Sort by Score</SelectItem>
          <SelectItem value="investment">Sort by Investment</SelectItem>
          <SelectItem value="name">Sort by Name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchAndFilter;