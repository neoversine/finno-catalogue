import React, { useEffect, useState } from 'react'
import { GiCrossMark } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ShoppingCartModal = ({ showCart, selectedItems, setSelectedItems }) => {
    const [totalBill, setTotalBill] = useState(0);

    const RemoveItem = (itemId) => {
        setSelectedItems((prev) => (prev.filter((i) => i.itemId !== itemId)));
    }

    useEffect(() => {
        setTotalBill(selectedItems.reduce((acc, ele) => acc + (ele?.totalPrice ?? 0), 0))
    }, [selectedItems])
    return (

        <div
            className={`absolute z-[50] top-14 right-1/2 max-md:translate-x-1/2 md:right-0 max-md:w-[95%] md:w-7/12 
  bg-white shadow-2xl rounded-2xl border border-lime-400/40 transition-all duration-300 
  ${showCart ? "block" : "hidden"}`}
        >
            {/* Cart Items Section */}
            <div className="flex flex-col gap-2 max-h-[55vh] w-full p-3 overflow-auto">
                {selectedItems.length === 0 ? (
                    <p className="text-center py-10 text-gray-500 font-medium">
                        🛒 Your cart is empty
                    </p>
                ) : (
                    selectedItems?.map((ele, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 py-3 px-4 bg-gradient-to-r from-lime-50 to-cyan-50 
          border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Product Image */}
                            <img
                                src={ele.image}
                                alt={ele.name || "Product Image"}
                                className="h-14 w-14 md:h-16 md:w-16 rounded-xl object-cover border border-lime-200"
                            />

                            {/* Product Info */}
                            <div className="flex flex-col flex-1 min-w-0">
                                {/* Product Name + Size Badge */}
                                <div className="flex items-center gap-2">
                                    <p className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                                        {ele.name}
                                    </p>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                ${ele.selectedCutSize[0]?.toLowerCase() === "s"
                                                ? "bg-cyan-100 text-cyan-700"
                                                : ele.selectedCutSize[0]?.toLowerCase() === "m"
                                                    ? "bg-pink-100 text-pink-700"
                                                    : ele.selectedCutSize[0]?.toLowerCase() === "l"
                                                        ? "bg-lime-100 text-lime-700"
                                                        : "bg-sky-100 text-sky-700"
                                            }`}
                                    >
                                        {ele.selectedCutSize[0] || "W"}
                                    </span>
                                </div>

                                {/* Cut Type + Quantity */}
                                <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                                    <span className="px-3 py-1 rounded-full border border-gray-300 bg-white shadow-sm max-md:text-xs">
                                        {ele.selectedCut}
                                    </span>
                                    <span className="max-md:text-sm font-medium text-gray-500 whitespace-nowrap">
                                        Qty: {ele.totalQuantity}
                                    </span>
                                </div>
                            </div>

                            {/* Price + Remove Button */}
                            <div className="flex flex-col items-end ml-2 gap-2">
                                <p className="text-base md:text-lg font-bold bg-gradient-to-r from-lime-600 to-cyan-600 bg-clip-text text-transparent">
                                    ₹{ele?.totalPrice}
                                </p>
                                <button
                                    onClick={() => RemoveItem(ele.itemId)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <RiDeleteBin6Line className="text-lg md:text-xl" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center rounded-b-2xl border-t border-lime-300 px-5 py-4 bg-gradient-to-r from-white to-lime-50">
                {/* Cart Items */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Cart Items:</span>
                    <span className="text-lg font-bold text-gray-800">
                        {selectedItems?.length}
                    </span>
                </div>

                {/* Total Price */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Total Price:</span>
                    <span className="text-lg font-extrabold bg-gradient-to-r from-lime-600 to-cyan-600 bg-clip-text text-transparent">
                        ₹{totalBill}
                    </span>
                </div>
            </div>
        </div>


    )
}

export default ShoppingCartModal