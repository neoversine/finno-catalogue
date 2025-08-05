// import { useState } from "react";
import { Phone, X } from "lucide-react";

export default function PhoneOverlay({ setPhoneNumber, phoneNumber, setIsValidPhNumber, isValidPhNumber }) {

    const handleSubmit = () => {
        if (/^\d{10}$/.test(phoneNumber)) {
            setIsValidPhNumber(true);
        } else {
            alert("Phone number must be exactly 10 digits.");
        }
    };

    return (
        <>
            {!isValidPhNumber && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-6">
                        {/* Close Button */}
                        <button
                            // onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="flex items-center justify-center space-x-2">
                            <Phone className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Enter Phone Number</h2>
                        </div>

                        {/* Input */}
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="10-digit phone number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                        />

                        {/* Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Submit
                        </button>
                    </div>
                </div>

            )}
        </>
    );
}
