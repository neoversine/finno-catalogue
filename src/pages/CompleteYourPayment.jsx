// src/pages/CompleteYourPayment.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const CompleteYourPayment = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 text-center border border-gray-200">
                <div className="flex justify-center items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#f2805a]/10 flex items-center justify-center animate-pulse">
                        <FaWhatsapp className="text-[#f2805a] text-3xl" />
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Payment Link Sent!</h2>
                <p className="text-gray-600 mb-6">
                    We've sent a secure payment link to your WhatsApp. Please complete your payment to proceed.
                </p>
                <button
                    className="bg-[#f2805a] hover:bg-[#e57048] transition-colors text-white px-6 py-3 rounded-xl text-sm font-medium"
                    onClick={() => window.open(`https://wa.me/`, '_blank')}
                >
                    Open WhatsApp
                </button>
            </div>
        </div>
    );
};

export default CompleteYourPayment;
