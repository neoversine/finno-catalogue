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
    const [showModal, setShowModal] = useState(false);
    const [tempCut, setTempCut] = useState(null);

    const handleCutClick = (cut) => {
        if (isAlreadySelected) {
            notify("Deselect the item!", "warning");
            return;
        }

        if (cut !== "Whole" && cut !== "Cleaned" && cut !== "Cut in half") {
            setTempCut(cut); // Temporarily store cut until size is selected
            setShowModal(true);
        } else {
            setSelectedCut(cut);
            setSelectedCutSize("Whole");
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
            <div className="grid grid-cols-2 gap-2 text-xs">
                {cuts.map((cut, i) => (
                    <button
                        key={i}
                        onClick={() => handleCutClick(cut)}
                        className={`text-center border rounded-full py-1.5 px-2 transition-all duration-200 shadow-sm 
          ${selectedCut === cut
                                ? "bg-gradient-to-r from-green-500 to-green-400 text-white border-transparent scale-105"
                                : "bg-white border-gray-300 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md"
                            }`}
                    >
                        {cut}
                    </button>
                ))}
            </div>

            {/* Modal for Cut Size */}
            {showModal && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-5 rounded-2xl shadow-xl w-[220px] text-sm animate-fade-in">
                        {/* Modal Title */}
                        <p className="mb-4 font-semibold text-center text-gray-800">
                            Select Cut Size
                        </p>

                        {/* Cut Size Buttons */}
                        <div className="flex flex-col gap-2">
                            {availableCutSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeSelect(size)}
                                    className="text-xs border px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm 
                         bg-white border-gray-300 text-gray-700 
                         hover:border-lime-400 hover:text-lime-600 hover:shadow-md"
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
