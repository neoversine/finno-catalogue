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
        <div className="flex items-center gap-3 w-full font-medium">
            <button
                onClick={decrement}
                className="text-black"
                disabled={isAlreadySelected}
            >
                −
            </button>
            <span className="flex justify-center grow py-1 bg-gray-400/20 border border-gray-500/50 rounded-lg text-sm">
                {`${totalVal % 1 === 0 ? totalVal : totalVal.toFixed(2)} ${unit}${quantity > 1 ? "s" : ""}`}
            </span>
            <button
                onClick={increment}
                className="text-black"
                disabled={isAlreadySelected}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
