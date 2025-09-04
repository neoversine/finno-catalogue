import { useState } from "react";
import CategorySection from "../components/catalogue/CategorySection";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProductsContext } from "../context/ProductContext";
import NewHeader from "../components/basic/NewHeader";
import CheckoutSection from "../components/checkout/CheckoutSection";
import CategoriesList from "../components/catalogue/CategoriesList";

const Categories = [
    { name: "Freshwater-Fish", imgSrc: "https://res.cloudinary.com/dqbxgjov1/image/upload/v1710354800/timoom2rt8qlasatvtyt.jpg" },
    { name: "Seawater-Fish", imgSrc: "/seafish.jpg" },
    { name: "Shell-Fish", imgSrc: "/shellfish.jpg" },
    { name: "Chicken", imgSrc: "https://www.shutterstock.com/image-photo/raw-chicken-breast-fillets-legs-600nw-1057379873.jpg" }
]



const HomePage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const { finnoItems, isLoading } = useProductsContext();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex flex-col h-screen">
            <NewHeader selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 h-[70%] max-w-6xl mx-auto pb-32">
                <CategoriesList Categories={Categories} />
                {/* Main Content */}
                <main className="flex flex-col col-span-3 md:col-span-4 pr-2 overflow-y-scroll">
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

            <CheckoutSection cartItems={selectedItems} />

            {/* Sticky Telegram Button */}
            {/* <TelegramButton
                selectedItems={selectedItems}
                totalItems={totalItems}
                address={address}
                setSelectedItems={setSelectedItems}
            /> */}
        </div>
    );
};

export default HomePage;
