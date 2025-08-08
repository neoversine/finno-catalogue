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

        <div className={`absolute z-[0] top-20 right-1/2 max-md:translate-x-1/2 md:-right-3 w-full md:w-1/2  bg-gray-50 shadow-xl rounded-xl border border-orange-500/60 ${showCart ? 'block' : 'hidden'}`}>
            <div className='flex flex-col gap-2 max-h-[50vh] w-full p-3 overflow-auto'>
                {
                    selectedItems.length == 0 ? "No items selected" :
                        selectedItems?.map((ele, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 py-3 px-3 md:py-4 md:px-4 bg-white border border-gray-300 rounded-lg font-sans shadow-sm"
                            >
                                {/* Product Image */}
                                <img
                                    src={ele.image}
                                    alt={ele.name || "Product Image"}
                                    className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border border-gray-200"
                                />

                                {/* Product Info */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    {/* Product Name + Size Badge */}
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                                            {ele.name}
                                        </p>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${ele.selectedCutSize[0]?.toLowerCase() === "s"
                                                ? "bg-cyan-100 text-cyan-700"
                                                : ele.selectedCutSize[0]?.toLowerCase() === "m"
                                                    ? "bg-pink-100 text-pink-700"
                                                    :
                                                    ele.selectedCutSize[0]?.toLowerCase() === "l" ? "bg-green-100 text-green-700" : "bg-sky-100 text-sky-700"
                                                }`}
                                        >
                                            {ele.selectedCutSize[0] || "W"}
                                        </span>
                                    </div>

                                    {/* Cut Type + Quantity */}
                                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                                        <span className="px-2 py-0.5 rounded-full border border-gray-300 bg-gray-50">
                                            {ele.selectedCut}
                                        </span>
                                        <span className="font-medium text-purple-700 whitespace-nowrap">
                                            Qty: {ele.totalQuantity}
                                        </span>
                                    </div>
                                </div>

                                {/* Price + Remove Button */}
                                <div className="flex flex-col items-end ml-2 gap-2">
                                    <p className="text-base md:text-lg font-bold text-gray-900">
                                        ₹{ele?.totalPrice}
                                    </p>
                                    <button
                                        onClick={() => RemoveItem(ele.itemId)}
                                        className="text-orange-600 hover:text-red-700 transition-colors"
                                    >
                                        <RiDeleteBin6Line className="text-lg md:text-xl" />
                                    </button>
                                </div>
                            </div>


                        ))
                }
            </div>

            <div className="flex justify-between items-center rounded-b-xl border-t border-orange-400 px-4 py-4 bg-white font-sans">
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
                    <span className="text-lg font-bold text-gray-800">
                        ₹{totalBill}
                    </span>
                </div>
            </div>

        </div>

    )
}

export default ShoppingCartModal