// components/GameFilters.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { boardGameCategories } from "@/models/game";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFilters } from "@/store/slices/filtersSlice";
import { FilterX } from "lucide-react";


export default function GameFilters() {
  const filters = useSelector((state: RootState) => state.filters.filters);
  const dispatch = useDispatch();
  
  const handleFilterChange = (key: string, value: string | number) => {
    const updatedFilters = { ...filters, [key]: value };
    dispatch(setFilters(updatedFilters));
  };

  const handleReset = () => {
    const resetFilters = { category: "All" };
    dispatch(setFilters(resetFilters));
  };

  return (
    <div className="flex gap-4">
      <Select
        value={filters.category as string}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {boardGameCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleReset}>
        <FilterX/> <span className="md:inline hidden">Reset Filters</span>
      </Button>
    </div>
  );
}
