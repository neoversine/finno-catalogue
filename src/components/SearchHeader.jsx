import { Search, Filter, X } from "lucide-react";

const SearchHeader = ({
    searchQuery,
    onSearchChange,
    selectedCount,
    onClearSelection
}) => {
    return (
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 z-40 pb-4">
            {/* Main Header */}
            <div className="mb-4">
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-gradient mb-1">
                        Finno Farms Market
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Premium quality, delivered fresh
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search for fresh items..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-10 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm focus:bg-card transition-colors w-full py-2"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Selection Bar */}
            {selectedCount > 0 && (
                <div className="catalog-surface p-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                        {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
                    </span>
                    <button
                        onClick={onClearSelection}
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchHeader;
