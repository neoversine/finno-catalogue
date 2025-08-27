import { ShoppingCart } from 'lucide-react'
import React, { use, useState } from 'react'
import ShoppingCartModal from '../Items/ShoppingCartModal';
import { useUserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';

const AddresDiv = ({ addr }) => {
    const handleEdit = (addr) => {
    }
    const handleDelete = (addr) => { }
    return (
        <div
            className="p-4 border border-green-300 rounded-xl bg-white/70 hover:bg-green-50/80 hover:border-green-400 transition cursor-pointer shadow-sm"
        >
            {/* Title & Default Tag */}
            <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">{addr.title}</p>
                {addr.isDefault && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md">
                        Default
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Full Name:</span> {addr.fullName}</p>
                <p><span className="font-medium">Phone:</span> {addr.phoneNo}</p>
                <p><span className="font-medium">Apartment:</span> {addr.apartmentAddress}</p>
                <p><span className="font-medium">Street:</span> {addr.streetAddress}</p>
                <p><span className="font-medium">Landmark:</span> {addr.landmark}</p>
                <p><span className="font-medium">Sector:</span> {addr.sector}</p>
                <p><span className="font-medium">City:</span> {addr.city}</p>
                <p><span className="font-medium">State:</span> {addr.state}</p>
                <p><span className="font-medium">Pincode:</span> {addr.pincode}</p>
            </div>

            {/* Created At */}
            <p className="mt-2 text-xs text-gray-500">
                Added on {new Date(addr.createdAt).toLocaleDateString()}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-3">
                <button
                    onClick={() => handleEdit(addr)}
                    className="px-3 py-1.5 text-sm rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(addr._id)}
                    className="px-3 py-1.5 text-sm rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

const AddressModal = ({ show, onClose, user, addresses, onLogout = () => { } }) => {
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
                                <AddresDiv addr={addr} />
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


const NewHeader = ({ selectedItems, setSelectedItems }) => {
    const [showCart, setShowCart] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const { user, defaultAddress } = useUserContext();

    const userMobileNo = user?.mobileNo;
    console.log(user.addresses)

    return (
        <div className="sticky top-0 z-[50] w-full py-3 md:px-6 backdrop-blur-md bg-white shadow-md">
            <div className="relative max-w-6xl mx-auto px-4">
                <div className='flex items-center justify-between h-fit'>
                    {/* Title */}
                    <div className="flex flex-col mb-3">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 via-cyan-500 to-green-900 bg-clip-text text-transparent mb-1">
                            Finno Farms Market
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Premium quality, delivered fresh
                        </p>
                    </div>

                    {/* Cart Icon */}
                    <div
                        onClick={() => setShowCart((prev) => !prev)}
                        className="relative cursor-pointer hover:scale-110 transition-transform"
                    >
                        {selectedItems?.length > 0 && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-lime-500 to-cyan-500 text-white text-xs font-bold px-2 py-[2px] rounded-full shadow-md">
                                {selectedItems?.length}
                            </div>
                        )}
                        <ShoppingCart className="w-7 h-7 mb-1 text-cyan-600 hover:text-lime-600 transition-colors" />
                    </div>

                </div>

                {/* User Info Small Div */}
                <div
                    onClick={() => setShowAddressModal(true)}
                    className="cursor-pointer bg-white hover:bg-cyan-50 border border-gray-200 rounded-xl px-4 py-3 mb-1 shadow-md flex items-center justify-between gap-4 transition"
                >
                    {/* Left: Address + Phone */}
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                            {defaultAddress?.title || "No Address"}
                        </p>
                        <p className="text-xs text-gray-500">{userMobileNo}</p>
                    </div>

                    {/* Right: Change button */}
                    <span className="text-cyan-600 text-sm font-semibold flex items-center gap-1">
                        Change
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>



                {/* Modals */}
                <ShoppingCartModal
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    showCart={showCart}
                />


                <AddressModal
                    show={showAddressModal}
                    user={user}
                    onClose={() => setShowAddressModal(false)}
                    addresses={user.addresses || []}
                />
            </div>
        </div>
    )
}

export default NewHeader
