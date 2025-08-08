import { useState, useEffect, useMemo } from "react";
import catalogData from "../data/catalog.json";
import SearchHeader from "../components/SearchHeader";
import CategorySection from "../components/CategorySection";
import TelegramButton from "../components/TelegramButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { transformSheetData } from "../lib/SheetRuleEngine";
import Header from "../components/Header";

const sheetId = "1tuRA0qbkS5d5A3osrRhnHzL1zKuqgkkzmNK06OecY4s";
const sheetName = "Products";

const HomePage = ({ address }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [finnoItems, setFinnoItems] = useState([]);
    const [totalItems, setTotalItems] = useState([]);

    // Simulate loading
    useEffect(() => {
        fetch(
            `https://opensheet.elk.sh/${sheetId}/${sheetName}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTotalItems(data.length);
                setFinnoItems(transformSheetData(data));
                setIsLoading(false);
            });
    }, []);


    const handleClearSelection = () => {
        setSelectedItems([]);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-soft">
            <Header selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            <div className="max-w-5xl mx-auto max-xl:px-4 pb-32">
                {/* <SearchHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCount={selectedItems.length}
                    onClearSelection={handleClearSelection}
                /> */}

                {/* Main Content */}
                <main className="">
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
                selectedItems={selectedItems}
                totalItems={totalItems}
                address={address}
                setSelectedItems={setSelectedItems}
            />
        </div>
    );
};

export default HomePage;
