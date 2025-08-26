/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const QuantitySelector = ({
    isAlreadySelected,
    min = "",
    quantity,
    setQuantity,
    setTotalQuantity,
}) => {
    // Extract numeric value and unit from string
    const parseValue = (val) => {
        const match = val?.trim().match(/^([\d.]+)\s*([a-zA-Z]+)$/);
        if (!match) return { number: 1, unit: "piece" };
        return {
            number: parseFloat(match[1]),
            unit: match[2].toLowerCase(),
        };
    };

    const { number: baseValue, unit } = parseValue(min);

    // Initialize quantity on mount
    useEffect(() => {
        setQuantity(1);
    }, []);

    // Update totalQuantity string on quantity change
    useEffect(() => {
        const totalVal = parseFloat((quantity * baseValue).toFixed(2));
        const formatted = `${totalVal % 1 === 0 ? totalVal : totalVal.toFixed(2)} ${unit}${quantity > 1 ? "s" : ""}`;
        setTotalQuantity(formatted);
    }, [quantity, baseValue, unit]);

    const increment = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrement = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const totalVal = parseFloat((quantity * baseValue).toFixed(2));

    return (
        <div className="flex items-center gap-1 md:gap-2 w-full font-sans font-medium">
            {/* Decrement Button */}
            <button
                onClick={decrement}
                className="w-6 md:w-8 h-6 md:h-8 flex items-center justify-center rounded-lg border text-lg 
               transition-all duration-200 shadow-sm
               border-gray-300 text-gray-700 
               hover:bg-red-50 hover:border-red-400 hover:text-red-600 active:text-red-700 
               disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAlreadySelected}
            >
                −
            </button>

            {/* Quantity Display */}
            <span
                className="flex justify-center grow py-1 bg-white border border-gray-300 rounded-lg 
               text-sm text-gray-800 shadow-sm"
            >
                {`${totalVal % 1 === 0 ? totalVal : totalVal.toFixed(2)} ${unit}${quantity > 1 ? "s" : ""
                    }`}
            </span>

            {/* Increment Button */}
            <button
                onClick={increment}
                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-lg border text-lg
               transition-all duration-200 shadow-sm
               border-gray-300 text-gray-700
               hover:bg-gradient-to-r hover:from-lime-100 hover:to-cyan-300 
               hover:text-black active:scale-105 
               disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAlreadySelected}
            >
                +
            </button>
        </div>


    );
};

export default QuantitySelector;
