import { FaWhatsapp } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useUserContext } from "../context/UserContext";

export default function CompleteYourPayment() {
    const { user } = useUserContext();
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center border border-gray-200"
            >
                {/* Animated Icon */}
                <div className="flex justify-center items-center mb-6">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="w-16 h-16 rounded-full bg-[#f2805a]/10 flex items-center justify-center"
                    >
                        <FaWhatsapp className="text-[#f2805a] text-3xl" />
                    </motion.div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Payment Link Sent!
                </h2>

                {/* Info */}
                <p className="text-gray-600 mb-2">
                    We’ve sent a secure payment link to your WhatsApp.
                </p>
                <p className="text-gray-700 font-medium mb-6">
                    📱 Mobile: <span className="text-[#f2805a]">{user?.mobileNo}</span>
                </p>

                {/* CTA Button */}
                <button
                    className="bg-[#f2805a] hover:bg-[#e57048] transition-colors text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg"
                    onClick={() => window.open(`https://wa.me/${user?.mobileNo}`, "_blank")}
                >
                    Open WhatsApp
                </button>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 mt-5">
                    Didn’t receive the link? Please check WhatsApp or contact support.
                </p>
            </motion.div>
        </div>
    );
}
