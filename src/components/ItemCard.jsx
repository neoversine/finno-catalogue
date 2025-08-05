import { useRef, useState } from "react";
import { Heart, ShoppingCart, Package } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { notify } from "../lib/Toaster";



const ItemCard = ({ item, selectedItems, setSelectedItems }) => {
    const area = localStorage.getItem('userAddress') || "ne";
    console.log(JSON.parse(area).sector);
    const [selectedCut, setSelectedCut] = useState(null);
    const [totalQuantity, setTotalQuantity] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);


    const [quantity, setQuantity] = useState();

    const toastShownRef = useRef(false);

    const priceSplit = String(item.price).split(",");
    const selectedAreaIndex =
        area === "North Kolkata" ? 0 : area === "South Kolkata" ? 1 : 2;
    const [priceAccordingToArea, quantityAccordingToArea] =
        priceSplit[selectedAreaIndex]?.split("/").map((s) => s.trim()) || [];

    const getStockStatus = () => {
        if (item.available === "FALSE") return "out-of-stock";
        if (item.available === true && item.stock <= 10) return "low-stock";
        return "in-stock";
    };

    const getStockBadge = () => {
        const status = getStockStatus();
        switch (status) {
            case "out-of-stock":
                return <span className="catalog-badge-danger">Out of Stock</span>;
            case "low-stock":
                return <span className="catalog-badge-warning">Low Stock</span>;
            default:
                return <span className="catalog-badge-success">In Stock</span>;
        }
    };


    const isAlreadySelected = selectedItems.some(
        (selected) => selected.itemId === item.id
    );

    const handleSelect = () => {
        if (!selectedCut || item.stock === 0) return;

        const totalPrice = parseFloat(quantity * priceAccordingToArea);

        const itemInfo = {
            itemId: item.id,
            name: item.name,
            price: priceSplit[selectedAreaIndex],
            image: item.image,
            totalPrice,
            totalQuantity: totalQuantity,
            selectedQuantity: quantity,
            selectedCut,
        };

        console.log(itemInfo);
        setSelectedItems((prev) => {
            const exists = prev.some((i) => i.itemId === itemInfo.itemId);

            if (!toastShownRef.current) {
                toastShownRef.current = true;
                setTimeout(() => (toastShownRef.current = false), 100); // reset after 100ms

                notify(
                    exists
                        ? `${itemInfo.name} removed from your bag.`
                        : `${itemInfo.name} added to your bag.\nCut: ${itemInfo.selectedCut}\nQuantity: ${itemInfo.selectedQuantity} (${itemInfo.totalQuantity})\nTotal Price: ₹${itemInfo.totalPrice.toFixed(2)}`,
                    exists ? "info" : "success"
                );
            }

            return exists
                ? prev.filter((i) => i.itemId !== itemInfo.itemId)
                : [...prev, itemInfo];
        });


    };

    const cuts = item?.typesOfCut?.split(",").map((s) => s.trim()) || [];

    return (
        <div
            className={`bg-white border border-[#e8e2d9] rounded-2xl shadow-[0_2px_12px_-2px_hsl(25,25%,35%,0.08)] transition-all duration-300 ease-out hover:shadow-[0_8px_30px_-8px_hsl(15,85%,65%,0.25)] p-4 ${isAlreadySelected ? "border-2 border-[#f2805a] " : ""} fade-in`}
        >
            {/* Image */}
            <div className="relative mb-3 rounded-xl overflow-hidden bg-[--muted]">
                <div className="aspect-square relative">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-[--muted] animate-pulse flex items-center justify-center">
                            <Package className="w-8 h-8 text-[--muted-foreground]" />
                        </div>
                    )}
                    <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                    />

                    {/* Like button */}
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110"
                    >
                        <Heart
                            className={`w-4 h-4 transition-colors duration-200 ${isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-[--muted-foreground]"
                                }`}
                        />
                    </button>

                    {/* Stock Badge */}
                    <div className="absolute bottom-2 left-2">{getStockBadge()}</div>
                </div>
            </div>

            {/* Text content */}
            <div className="space-y-2">
                <h3 className="font-semibold text-sm text-[--foreground] leading-snug line-clamp-2">
                    {item.name}
                </h3>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[2px]">
                        <span className="text-xl font-bold text-[--primary]">
                            {item.currency}
                            {priceAccordingToArea}
                        </span>
                        <span className="text-[10px] text-[--muted-foreground]">
                            /{quantityAccordingToArea}
                        </span>
                    </div>
                </div>

                {/* Cut Select Action */}
                <div className="grid grid-cols-2 gap-1 text-[10px] text-[--muted-foreground]">
                    {cuts?.map((cut, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                if (isAlreadySelected) {
                                    notify("Deselect the item!", "warning");
                                    return;
                                }
                                setSelectedCut(cut);
                            }}
                            className={`text-center border py-[4px] px-[2px] rounded-full transition-all ${selectedCut === cut
                                ? "bg-[#f2805a] text-white border-[#f2805a]"
                                : "hover:bg-muted"
                                }`}
                        >
                            {cut}
                        </button>
                    ))}
                </div>

                <QuantitySelector
                    totalQuanitity={totalQuantity} setTotalQuantity={setTotalQuantity}
                    quantity={quantity} setQuantity={setQuantity}
                    isAlreadySelected={isAlreadySelected}
                    min={item.minQuantityToBuy}
                />

                {/* Action Button */}
                <div className="flex gap-2 pt-2">
                    <button
                        className={`flex-1 text-xs px-3 py-2 rounded-xl border flex items-center justify-center gap-1 transition-all duration-200 ${isAlreadySelected
                            ? "bg-[#f2805a] text-white border-[--ring]"
                            : "bg-[#fffbf5] border-border text-[--foreground] hover:bg-[--muted]"
                            } ${!selectedCut || item.stock === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}

                        onClick={() => {
                            if (!selectedCut) {
                                notify("Please select a cut before proceeding!", "warning");
                                return;
                            }
                            if (item.stock === 0) {
                                notify("This item is out of stock!", "error");
                                return;
                            }
                            handleSelect();
                        }}
                    >
                        <ShoppingCart className="w-3 h-3" />
                        {isAlreadySelected ? "Selected" : "Select"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
