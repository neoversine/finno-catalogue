
import ItemCard from "./ItemCard";

const CategorySection = ({ category, selectedItems, setSelectedItems, onToggleSelect }) => {






    return (
        <section className="mb-10 mt-4 fade-in">

            {/* Subcategories */}
            <div className="space-y-6">
                {category.subcategories.map((subcategory, index) => {
                    return (
                        <div
                            key={subcategory.id}
                            className="rounded-xl md:border md:border-lime-200 bg-white/80 md:shadow-lg md:hover:shadow-xl transition-all duration-300 overflow-hidden"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            id={subcategory.name.replace(/\s+/g, "-")}
                        >
                            {/* Subcategory Header */}
                            <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-4">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-lime-600 transition-colors">
                                    {subcategory.name}
                                </h3>
                            </div>
                            {/* <button
                                onClick={() => toggleSubcategory(subcategory.id)}
                                className="hidden md:flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-4 group"
                            >
                                
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
                            </button> */}

                            {/* Items Grid */}
                            <div
                                className={`grid transition-all duration-500 ease-in-out grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-5 md:px-6`}
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
