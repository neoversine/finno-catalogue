import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import PaymentSection from "./PaymentSection";
import { useNavigate } from "react-router-dom";

export default function CheckoutSection({ cartItems }) {
    const { user, defaultAddress } = useUserContext();
    const [paymentMode, setPaymentMode] = useState("COD");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalBill, setTotalBill] = useState(0);
    const handlePlaceOrder = () => {
        setShowModal(true);
    };

    const navigate = useNavigate();

    const handleConfirmOrder = async () => {
        setLoading(true); // start loading

        try {
            const webhookData = {
                mobileNo: user?.mobileNo,
                address: defaultAddress,
                cartItems,
                cashOnDelivery: paymentMode === "COD",
                totalCartBill: paymentMode === "Online"
                    ? (totalBill * 0.9).toFixed(2)   // 10% OFF
                    : (totalBill + 29).toFixed(2)
            };

            const response = await fetch(
                "https://n8n.finnofarms.in/webhook/4b09e954-9fa8-4639-a035-af152d6ba34e",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(webhookData),
                }
            );

            console.log("Order Response:", response);

            navigate('/complete-your-payment');
            setShowModal(false);
        } catch (error) {
            console.error("Error confirming order:", error);
        } finally {
            setLoading(false); // stop loading
        }
    };


    useEffect(() => {
        setTotalBill(cartItems.reduce((acc, ele) => acc + (ele?.totalPrice ?? 0), 0))
    }, [cartItems])

    return (
        <div className="fixed bottom-0 w-full">
            <div className="flex justify-center w-full border-t border-gray-200 bg-white/70 backdrop-blur-md p-4 rounded-t-2xl shadow-lg">
                {/* Payment Mode */}
                <PaymentSection paymentMode={paymentMode} setPaymentMode={setPaymentMode} handlePlaceOrder={handlePlaceOrder} />
            </div>

            <>
                {/* Confirmation Modal */}
                {
                    showModal && (
                        <div className="fixed inset-0 flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-white to-cyan-100/70 backdrop-blur-sm z-50">
                            <div className="w-[90%] max-w-md mx-3 p-6 rounded-2xl shadow-2xl border border-green-200 bg-white/80 backdrop-blur-xl">

                                {/* Title */}
                                <h2 className="text-2xl font-extrabold text-green-700 tracking-wide text-center mb-6">
                                    Confirm Your Order
                                </h2>

                                {/* Mobile */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Registered Mobile</p>
                                    <p className="font-medium text-gray-800">{user?.mobileNo}</p>
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Delivery Address</p>
                                    <p className="font-medium text-gray-800">
                                        {defaultAddress.title || "No address selected"}
                                    </p>
                                </div>

                                {/* Items */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-1">Selected Items</p>
                                    <ul className="space-y-2 text-gray-700 text-sm">
                                        {cartItems?.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="flex justify-between items-center p-2 rounded-lg bg-green-50/70 border border-green-200"
                                            >
                                                <span>
                                                    {item.name} × {item.totalQuantity}
                                                </span>
                                                <span className="font-bold bg-gradient-to-r from-lime-600 to-cyan-600 bg-clip-text text-transparent">
                                                    ₹{item?.totalPrice}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center mb-4 border-t border-gray-200 pt-3">
                                    <span className="text-sm text-gray-600">
                                        Total Price:
                                    </span>

                                    <div className="text-right">
                                        {/* If Online Payment → show discount */}
                                        {paymentMode === "Online" ? (
                                            <>
                                                <p className="text-xs text-gray-500 line-through">₹{totalBill}</p>
                                                <p className="text-xl font-extrabold bg-gradient-to-r from-lime-600 to-cyan-600 bg-clip-text text-transparent">
                                                    ₹{(totalBill * 0.9).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-green-600 font-medium">10% OFF Applied</p>
                                            </>
                                        ) : paymentMode === "COD" ? (
                                            <>
                                                <p className="text-xl font-extrabold bg-gradient-to-r from-lime-600 to-cyan-600 bg-clip-text text-transparent">
                                                    ₹{(totalBill + 29).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-red-600 font-medium">+₹29 COD Charge</p>
                                            </>
                                        ) : (
                                            <p className="text-xl font-extrabold bg-gradient-to-r from-lime-600 to-cyan-600 bg-clip-text text-transparent">
                                                ₹{totalBill}
                                            </p>
                                        )}
                                    </div>

                                </div>


                                {/* Payment Mode */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-medium text-gray-800">
                                        {paymentMode === "COD" ? "Cash on Delivery" : "Online Payment"}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmOrder}
                                        className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        Confirm Order
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="mt-6 text-center text-xs text-gray-500">
                                    <p className="flex items-center justify-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 11c0 .667-.333 1-1 1s-1-.333-1-1 .333-1 1-1 1 .333 1 1z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414"
                                            />
                                        </svg>
                                        Safe & Secure Checkout with Finno Farms
                                    </p>
                                </div>
                            </div>
                        </div>

                    )
                }
            </>

        </div>
    );

}
