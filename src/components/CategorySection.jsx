import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ItemCard from "./ItemCard";

const CategorySection = ({ category, selectedItems, setSelectedItems, onToggleSelect }) => {

    const [expandedSubcategories, setExpandedSubcategories] = useState(
        category.subcategories.map(sub => sub.id)
    );

    const toggleSubcategory = (subcategoryId) => {
        setExpandedSubcategories(prev =>
            prev.includes(subcategoryId)
                ? prev.filter(id => id !== subcategoryId)
                : [...prev, subcategoryId]
        );
    };



    return (
        <section className="mb-8 fade-in">
            {/* Category Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-2xl font-bold text-gradient">{category.name}</h2>
                </div>
                <div className="h-1 bg-gradient-warm rounded-full w-20"></div>
            </div>

            {/* Subcategories */}
            <div className="space-y-6">
                {category.subcategories.map((subcategory, index) => {
                    const isExpanded = expandedSubcategories.includes(subcategory.id);

                    return (
                        <div
                            key={subcategory.id}
                            className="catalog-surface md:p-4 slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Subcategory Header */}
                            <button
                                onClick={() => toggleSubcategory(subcategory.id)}
                                className="flex items-center justify-between w-full mb-4 text-left group"
                            >
                                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {subcategory.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {subcategory.items.length} items
                                    </span>
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    )}
                                </div>
                            </button>

                            {/* Items Grid */}
                            {isExpanded && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {subcategory.items.map((item, itemIndex) => (
                                        <div
                                            key={item.id}
                                            className="bounce-in"
                                            style={{ animationDelay: `${itemIndex * 0.05}s` }}
                                        >
                                            <ItemCard
                                                item={item}
                                                selectedItems={selectedItems}
                                                setSelectedItems={setSelectedItems}
                                                onToggleSelect={onToggleSelect}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CategorySection;
