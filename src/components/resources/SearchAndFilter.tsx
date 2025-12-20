import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  minScore: number;
  setMinScore: (score: number) => void;
  onExport: () => void;
  totalResults: number;
}

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy,
  minScore,
  setMinScore,
  onExport,
  totalResults
}: SearchAndFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search bar - full width on mobile */}
        <div className="w-full md:flex-1">
          <Input
            placeholder="Search industries, descriptions, key areas, or industry leaders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Filter, Sort, Export buttons - grouped on mobile */}
        <div className="flex gap-4">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {minScore > 0 && (
                  <span className="ml-1 rounded-full bg-primary text-white text-xs px-2 py-0.5">
                    1
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Minimum Readiness Score</h4>
                  <div className="space-y-2">
                    <Slider
                      value={[minScore]}
                      onValueChange={(values) => setMinScore(values[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0</span>
                      <span className="font-medium text-primary">{minScore}+</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
                
                {minScore > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMinScore(0)}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Sort by Score</SelectItem>
              <SelectItem value="investment">Sort by Allocation</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={onExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Analysis</span>
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Showing {totalResults} {totalResults === 1 ? 'industry' : 'industries'}
      </div>
    </div>
  );
};

export default SearchAndFilter;