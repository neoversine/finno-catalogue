import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingCart, Package } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { notify } from "../../lib/Toaster";
import CutSelector from "./CutSelector";
import { useUserContext } from "../../context/UserContext";

const ItemCard = ({ item, selectedItems, setSelectedItems, sector }) => {
    const [selectedCut, setSelectedCut] = useState(null);
    const [totalQuantity, setTotalQuantity] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [quantity, setQuantity] = useState();
    const [selectedCutSize, setSelectedCutSize] = useState("");

    const toastShownRef = useRef(false);
    const { defaultAddress } = useUserContext();

    const area = defaultAddress.sector;

    const priceSplit = String(item.price).split(",");
    const selectedAreaIndex =
        area === "South Kolkata" ? 0 : area === "North Kolkata" ? 1 : 2;
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
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 shadow-sm animate-fade-in">
                        Out of Stock
                    </span>
                );

            case "low-stock":
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 shadow-sm animate-fade-in">
                        Low Stock
                    </span>
                );

            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 shadow-sm animate-fade-in">
                        In Stock
                    </span>
                );

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
            selectedCutSize
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
            className={`bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-out p-3 md:p-4 ${isAlreadySelected ? "border-2 border-cyan-400" : "border-gray-200"
                } fade-in`}
        >
            {/* Product Image Section */}
            <div className="relative mb-3 rounded-xl overflow-hidden bg-gray-50">
                <div className="aspect-square relative">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
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

                    {/* Stock Badge */}
                    <div className="absolute bottom-2 left-2">{getStockBadge()}</div>
                </div>
            </div>

            {/* Product Details */}
            <div className="space-y-2">
                {/* Product Name */}
                <h3 className="font-semibold text-sm text-gray-800 leading-snug line-clamp-2">
                    {item.name}
                </h3>


                {
                    priceAccordingToArea != 'Unavailable' ?
                        <>
                            {/* Price Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-end gap-[2px]">
                                    <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-cyan-500 bg-clip-text text-green-950">
                                        {item.currency}
                                        {priceAccordingToArea}
                                    </span>
                                    <span className="mb-1 text-[10px] text-gray-500 leading-none">
                                        /{quantityAccordingToArea}
                                    </span>
                                </div>

                                {/* Cut Size Badge */}
                                {selectedCutSize && (
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${selectedCutSize[0]?.toLowerCase() === "s"
                                            ? "bg-cyan-100 text-cyan-700"
                                            : selectedCutSize[0]?.toLowerCase() === "m"
                                                ? "bg-pink-100 text-pink-700"
                                                : selectedCutSize[0]?.toLowerCase() === "l"
                                                    ? "bg-lime-100 text-lime-700"
                                                    : "bg-sky-100 text-sky-700"
                                            }`}
                                    >
                                        {selectedCutSize[0] || "W"}
                                    </span>
                                )}
                            </div>
                            {/* Cut Selector */}
                            <CutSelector
                                cuts={cuts}
                                selectedCut={selectedCut}
                                setSelectedCut={setSelectedCut}
                                selectedCutSize={selectedCutSize}
                                setSelectedCutSize={setSelectedCutSize}
                                availableCutSizes={item.sizesOfCutsAvailable}
                                isAlreadySelected={isAlreadySelected}
                                notify={notify}
                            />

                            {/* Quantity Selector */}
                            <QuantitySelector
                                totalQuanitity={totalQuantity}
                                setTotalQuantity={setTotalQuantity}
                                quantity={quantity}
                                setQuantity={setQuantity}
                                isAlreadySelected={isAlreadySelected}
                                min={item.minQuantityToBuy}
                            />

                            {/* Select Action */}
                            <div className="flex gap-2 pt-2">
                                <button
                                    className={`flex-1 text-xs px-3 py-2 rounded-xl flex items-center justify-center gap-1 font-medium transition-all duration-200 ${isAlreadySelected
                                        ? "bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg"
                                        : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-lime-50 hover:to-cyan-50"
                                        } ${!selectedCut || item.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
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
                        </> :

                        <div className="text-xs text-orange-600">Currently, we don’t deliver this item to your sector.</div>

                }
            </div>
        </div>

    );
};

export default ItemCard;
