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
        <section className="mb-10 mt-4 fade-in">
            {/* Category Header */}
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-cyan-500 bg-clip-text text-transparent">
                        {category.name}
                    </h2>
                </div>
                <div className="h-1.5 w-28 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400"></div>
            </div>

            {/* Subcategories */}
            <div className="space-y-6">
                {category.subcategories.map((subcategory, index) => {
                    const isExpanded = expandedSubcategories.includes(subcategory.id);

                    return (
                        <div
                            key={subcategory.id}
                            className="rounded-xl md:border md:border-lime-200 bg-white/80 md:shadow-lg md:hover:shadow-xl transition-all duration-300 overflow-hidden"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Subcategory Header */}
                            <button
                                onClick={() => toggleSubcategory(subcategory.id)}
                                className="flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-4 group"
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-lime-600 transition-colors">
                                    {subcategory.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        {subcategory.items.length} items
                                    </span>
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-lime-500 group-hover:scale-110 transition-transform" />
                                    )}
                                </div>
                            </button>

                            {/* Items Grid */}
                            <div
                                className={`grid transition-all duration-500 ease-in-out ${isExpanded
                                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:px-4 pb-5 md:px-6"
                                    : "grid-rows-0 h-0 overflow-hidden"
                                    }`}
                            >
                                {subcategory.items.map((item, itemIndex) => (
                                    <div
                                        key={item.id}
                                        className="animate-bounce-in"
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
                        </div>
                    );
                })}
            </div>
        </section>

    );
};

export default CategorySection;
