import { ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import ShoppingCartModal from '../Items/ShoppingCartModal';
import { useUserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';

import axios from "axios";
import Cookies from "js-cookie";
import { notify } from '../../lib/Toaster';
import axiosInstance from '../../lib/axiosInstance';


export const AddressDiv = ({ addr }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...addr });

    const { fetchAddresses } = useUserContext();

    // 📌 Handle Edit Save
    const handleEditSave = async () => {
        try {
            const token = Cookies.get("accessToken");
            console.log(formData);
            const res = await axiosInstance.put(
                `/address/update/${addr._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                notify("Address updated successfully ✅", "success");
                setIsEditing(false);
                fetchAddresses && fetchAddresses(); // refresh list
            }

        } catch (error) {
            console.error("Error updating address:", error);
            notify("Failed to update address ❌", "error");
        }
    };

    // 📌 Handle Delete
    const handleDelete = async (addressId) => {
        try {
            const token = Cookies.get("accessToken");

            const res = await axiosInstance.delete(
                `/address/delete/${addressId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                notify("Address deleted successfully ✅", "success");
                fetchAddresses && fetchAddresses();
            }

        } catch (error) {
            console.error("Error deleting address:", error);
            notify("Failed to delete address ❌", "error");
        }
    };

    // 📌 Handle Set Default
    const handleSetDefault = async (addressId) => {
        try {
            const token = Cookies.get("accessToken");

            const res = await axiosInstance.put(
                `/address/set-default/${addressId}`,
                {}, // no body needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res.data)

            if (res.data.success) {
                notify("Default address updated ✅", "success");
                fetchAddresses && fetchAddresses();
            }

        } catch (error) {
            console.error("Error setting default:", error);
            notify("Failed to set default ❌", "error");
        }
    };
    console.log(addr);

    return (
        <div className="p-4 border border-green-300 rounded-xl bg-white/70 hover:bg-green-50/80 hover:border-green-400 transition cursor-pointer shadow-sm">
            {/* Title & Default Tag */}
            <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">{addr.title}</p>
                {addr.isDefault && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md">
                        Default
                    </span>
                )}
            </div>

            {/* Editable Form OR Details */}
            {isEditing ? (
                <div className="space-y-3 text-sm">
                    {/* Full Name (Disabled) */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed text-gray-600"
                        value={formData.fullName}
                        disabled
                    />

                    {/* Phone (Disabled) */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed text-gray-600"
                        value={formData.phoneNo}
                        disabled
                    />

                    {/* Apartment */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={formData.apartmentAddress}
                        onChange={(e) =>
                            setFormData({ ...formData, apartmentAddress: e.target.value })
                        }
                        placeholder="Apartment"
                    />

                    {/* Street */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={formData.streetAddress}
                        onChange={(e) =>
                            setFormData({ ...formData, streetAddress: e.target.value })
                        }
                        placeholder="Street"
                    />

                    {/* Landmark */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={formData.landmark}
                        onChange={(e) =>
                            setFormData({ ...formData, landmark: e.target.value })
                        }
                        placeholder="Landmark"
                    />

                    {/* Sector */}
                    <select
                        name="sector"
                        value={formData.sector}
                        onChange={(e) =>
                            setFormData({ ...formData, sector: e.target.value })
                        }
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="North Kolkata">North Kolkata</option>
                        <option value="South Kolkata">South Kolkata</option>
                        <option value="New Town">New Town</option>
                        <option value="Howrah">Howrah</option>
                    </select>

                    {/* City */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={formData.city}
                        onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="City"
                    />

                    {/* State */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={formData.state}
                        onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                        }
                        placeholder="State"
                    />

                    {/* Pincode */}
                    <input
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={formData.pincode}
                        onChange={(e) =>
                            setFormData({ ...formData, pincode: e.target.value })
                        }
                        placeholder="Pincode"
                    />

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleEditSave}
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => { setIsEditing(false) }}
                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            ) : (
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
            )}

            {/* Created At */}
            <p className="mt-2 text-xs text-gray-500">
                Added on {new Date(addr.createdAt).toLocaleDateString()}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-3">
                {!addr.isDefault && (
                    <button
                        onClick={() => handleSetDefault(addr._id)}
                        className="px-3 py-1.5 text-sm rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition"
                    >
                        Set Default
                    </button>
                )}
                {!isEditing ? (
                    <button
                        onClick={() => { setFormData({ ...addr }); setIsEditing(true) }}
                        className="px-3 py-1.5 text-sm rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                    >
                        Edit
                    </button>
                ) : null}
                <button
                    onClick={() => handleDelete(addr._id)}
                    className="px-3 py-1.5 text-sm rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};