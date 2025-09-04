// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PaymentSection({ paymentMode, setPaymentMode, handlePlaceOrder }) {
    return (
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                    <h1
                        className=" text-sm font-medium tracking-wide"
                        style={{
                            display: window.innerHeight < 700 ? "none" : "block"
                        }}
                    >
                        Select Mode Of Payment
                    </h1>

                    <motion.div
                        className="flex w-full md:w-auto bg-gray-100 rounded-xl p-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {["COD", "Online"].map((mode) => (
                            <motion.button
                                key={mode}
                                onClick={() => setPaymentMode(mode)}
                                className={`relative flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${paymentMode === mode
                                        ? "bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow"
                                        : "text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {mode === "COD" ? "Cash on Delivery" : "Online Payment"}

                                {/* Show discount badge for Online */}
                                {mode === "Online" && (
                                    <span
                                        className={`absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md
            ${paymentMode === "Online"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        5% OFF
                                    </span>
                                )}

                                {/* Show COD */}
                                {mode === "COD" && (
                                    <span
                                        className={`absolute -top-2 -left-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md
      ${paymentMode === "COD"
                                                ? "bg-red-200 text-red-800"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        +₹29
                                    </span>
                                )}



                            </motion.button>
                        ))}
                    </motion.div>
                </div>

                {/* Place Order */}
                <div className="flex justify-end w-full md:w-auto">
                    <button
                        onClick={handlePlaceOrder}
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-md transition hover:shadow-lg disabled:opacity-50"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>

    );
}
