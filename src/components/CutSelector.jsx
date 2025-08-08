import { useState } from "react";

const CutSelector = ({
    cuts = [],
    selectedCut,
    setSelectedCut,
    setSelectedCutSize,
    availableCutSizes,
    isAlreadySelected,
    notify
}) => {
    console.log(availableCutSizes)
    const [showModal, setShowModal] = useState(false);
    const [tempCut, setTempCut] = useState(null);

    const handleCutClick = (cut) => {
        if (isAlreadySelected) {
            notify("Deselect the item!", "warning");
            return;
        }

        if (cut !== "Whole") {
            setTempCut(cut); // Temporarily store cut until size is selected
            setShowModal(true);
        } else {
            setSelectedCut(cut);
            setSelectedCutSize("");
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedCut(tempCut);
        setSelectedCutSize(size);
        setShowModal(false);
        setTempCut(null);
    };

    return (
        <div className="relative font-sans">
            {/* Cut Options Grid */}
            <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-500">
                {cuts.map((cut, i) => (
                    <button
                        key={i}
                        onClick={() => handleCutClick(cut)}
                        className={`text-center border rounded-full py-[4px] px-[2px] transition-all duration-200 ${selectedCut === cut
                            ? "bg-[#f2805a] text-white border-[#f2805a]"
                            : "hover:bg-gray-100 border-gray-300 text-gray-700"
                            }`}
                    >
                        {cut}
                    </button>
                ))}
            </div>

            {/* Modal for Cut Size */}
            {showModal && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[200px] text-sm">
                        {/* Modal Title */}
                        <p className="mb-3 font-semibold text-center text-gray-800">
                            Select Cut Size
                        </p>

                        {/* Cut Size Buttons */}
                        <div className="flex flex-col gap-2">
                            {availableCutSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeSelect(size)}
                                    className="text-xs border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default CutSelector;
