import { useState } from "react";
import CategorySection from "../components/catalogue/CategorySection";
import TelegramButton from "../components/TelegramButton";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/basic/Header";
import { useProductsContext } from "../context/ProductContext";

const HomePage = ({ address }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const { finnoItems, totalItems, isLoading } = useProductsContext();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen">
            <Header selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            <div className="max-w-6xl mx-auto max-xl:px-4 pb-32">
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
