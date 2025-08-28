
import React from 'react'
import { NavLink } from 'react-router-dom';
import { AddressDiv } from './AddressDiv';


export const AddressModal = ({ show, onClose, user, addresses, onLogout = () => { } }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-white/70 to-cyan-100 backdrop-blur-sm">
            <div className="w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border border-green-200 bg-white/70 backdrop-blur-lg relative">

                {/* User Mobile */}
                <div className="mb-4 p-3 rounded-lg border border-green-300 bg-green-50/60">
                    <p className="text-sm text-green-600 font-medium">Registered Mobile</p>
                    <p className="text-base font-semibold text-gray-800">
                        {user?.mobileNo}
                    </p>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-extrabold text-green-700 tracking-wide">
                        Your Addresses
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Address List */}
                <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                    {addresses?.length > 0 ? (
                        addresses.map((addr, idx) => (
                            <React.Fragment key={idx}>
                                <AddressDiv addr={addr} />
                            </React.Fragment>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm text-center">
                            No addresses available.
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <NavLink
                        to={"/add-address"}
                        className="w-full py-2.5 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 text-center transition-all duration-200 shadow-md"
                    >
                        Add Address
                    </NavLink>

                    <button
                        onClick={onLogout}
                        className="w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2
                    bg-red-100 text-red-600 border border-red-200 
                    hover:bg-red-200 hover:shadow-md 
                    transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Info Section */}
                <div className="text-xs text-gray-500 text-center mt-4">
                    ℹ️ To change your number, please logout and sign in again.
                </div>
            </div>
        </div>

    );
};