import { Button } from "@/components/ui/button";
import { LucideIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Array<{ id: string; label: string; icon: LucideIcon }>;
}

const CategoryBar = ({ selectedCategory, onCategoryChange, categories }: CategoryBarProps) => {
  // Show first 8 categories, rest in "More" dropdown
  const visibleCategories = categories.slice(0, 8);
  const moreCategories = categories.slice(8);
  
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
        {visibleCategories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`gap-2 shrink-0 ${
                isActive ? "hover:text-white" : "text-muted-foreground hover:text-white hover:bg-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
        
        {moreCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 shrink-0 text-muted-foreground hover:text-white hover:bg-primary">
                More
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreCategories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={isActive ? "bg-accent" : ""}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
