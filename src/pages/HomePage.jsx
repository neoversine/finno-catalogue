import { useState, useEffect, useMemo } from "react";
import catalogData from "../data/catalog.json";
import SearchHeader from "../components/SearchHeader";
import CategorySection from "../components/CategorySection";
import TelegramButton from "../components/TelegramButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { transformSheetData } from "../lib/SheetRuleEngine";

const sheetId = "1tuRA0qbkS5d5A3osrRhnHzL1zKuqgkkzmNK06OecY4s";
const sheetName = "Products";

const HomePage = ({ address }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [finnoItems, setFinnoItems] = useState([]);

    // Simulate loading
    useEffect(() => {
        fetch(
            `https://opensheet.elk.sh/${sheetId}/${sheetName}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFinnoItems(transformSheetData(data));
                console.log(transformSheetData(data));
                setIsLoading(false);
            });


    }, []);

    // Get all items for search and selection
    // eslint-disable-next-line no-unused-vars
    const { allItems, filteredCategories, totalItems } = useMemo(() => {
        const categories = catalogData.categories;
        const items = [];

        categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                items.push(...subcategory.items);
            });
        });

        const filtered = searchQuery
            ? categories
                .map(category => ({
                    ...category,
                    subcategories: category.subcategories
                        .map(subcategory => ({
                            ...subcategory,
                            items: subcategory.items.filter(item =>
                                item.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                        }))
                        .filter(subcategory => subcategory.items.length > 0)
                }))
                .filter(category => category.subcategories.length > 0)
            : categories;

        return {
            allItems: items,
            filteredCategories: filtered,
            totalItems: items.length
        };
    }, [searchQuery]);

    const selectedItemsData = selectedItems;

    // Toggle item selection based on full item object
    const handleToggleSelect = (itemInfo) => {
        setSelectedItems((prev) => {
            const exists = prev.some((item) => item.itemId === itemInfo.itemId);
            if (exists) {
                return prev.filter((item) => item.itemId !== itemInfo.itemId);
            } else {
                return [...prev, itemInfo];
            }
        });
    };

    const handleClearSelection = () => {
        setSelectedItems([]);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-soft">
            <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
                <SearchHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCount={selectedItems.length}
                    onClearSelection={handleClearSelection}
                />

                {/* Main Content */}
                <main className="mt-6">
                    {finnoItems.length > 0 ? (
                        finnoItems.map((category, index) => (
                            <div
                                key={category.id}
                                className="slide-up"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <CategorySection
                                    category={category}
                                    selectedItems={selectedItems}
                                    onToggleSelect={handleToggleSelect}
                                    setSelectedItems={setSelectedItems}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                No items found
                            </h3>
                            <p className="text-muted-foreground">
                                Try searching for something else
                            </p>
                        </div>
                    )}
                </main>
            </div>

            {/* Sticky Telegram Button */}
            <TelegramButton
                selectedItems={selectedItemsData}
                totalItems={totalItems}
                address={address}
                setSelectedItems={setSelectedItems}
            />
        </div>
    );
};

export default HomePage;
