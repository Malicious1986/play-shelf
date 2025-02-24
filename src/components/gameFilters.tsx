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
    <div className="flex flex-col md:flex-row gap-4">
      {/* ✅ Category Filter */}
      <Select
        value={filters.category as string}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {boardGameCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* ✅ Reset Button */}
      <Button variant="outline" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
