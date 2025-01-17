import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface InventoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availabilityFilter: string;
  onAvailabilityChange: (filter: string) => void;
}

export default function InventoryFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  availabilityFilter,
  onAvailabilityChange,
}: InventoryFiltersProps) {
  const categories = ['All', 'Audio', 'Lighting', 'Decor', 'Furniture', 'Merch'];
  const availabilityOptions = [
    { value: 'all', label: 'All Items' },
    { value: 'available', label: 'Available' },
    { value: 'low', label: 'Low Stock' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex gap-2 pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category === 'All' ? '' : category)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  (category === 'All' && !selectedCategory) || category === selectedCategory
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <select
          value={availabilityFilter}
          onChange={(e) => onAvailabilityChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
        >
          {availabilityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}