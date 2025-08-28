"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { notify } from "../lib/Toaster";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const AddAddressPage = () => {
    const { user, addresses } = useUserContext();
    const [form, setForm] = useState({
        title: "",
        fullName: "",
        phoneNo: user.mobileNo,
        apartmentAddress: "",
        streetAddress: "",
        landmark: "",
        city: "",
        sector: "North Kolkata",
        state: "",
        pincode: "",
        user: user._id,
        isDefault: addresses.length == 0 ? true : false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { fetchProfile } = useUserContext();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const token = Cookies.get("accessToken");
        if (!token) {
            setError("You are not logged in.");
            setLoading(false);
            return;
        }

        try {
            const res = await axiosInstance.post(
                "/address/add",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = res.data; // ✅ response body
            if (data.success) {
                await fetchProfile();
                navigate("/catalogue");
            } else {
                setError(data.message || "Failed to save address");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!user.addresses || user.addresses.length === 0) {
            notify("Please add your address to continue", "error");
        } else {
            navigate('/catalogue');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-cyan-100">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg mx-4 px-6 py-10 md:px-10 md:py-10 my-20 border border-green-200">

                {/* Heading */}
                <h2 className="text-3xl font-extrabold mb-5 text-green-700 text-center">
                    Add Delivery Address
                </h2>
                <p className="text-gray-500 text-sm text-center mb-8">
                    Help us bring FinnoFarms freshness straight to your doorstep 🍃
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title (Home / Work / Other)"
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Full Name */}
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Phone Number */}
                    <input
                        type="tel"
                        name="phoneNo"
                        value={form.phoneNo}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        pattern="[0-9]{10}"
                        required
                        disabled
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />

                    {/* Apartment */}
                    <input
                        type="text"
                        name="apartmentAddress"
                        value={form.apartmentAddress}
                        onChange={handleChange}
                        placeholder="Apartment / Flat / Building"
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Street */}
                    <input
                        type="text"
                        name="streetAddress"
                        value={form.streetAddress}
                        onChange={handleChange}
                        placeholder="Street Address"
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Landmark */}
                    <input
                        type="text"
                        name="landmark"
                        value={form.landmark}
                        onChange={handleChange}
                        placeholder="Landmark (Optional)"
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Sector */}
                    <select
                        name="sector"
                        value={form.sector}
                        onChange={handleChange}
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="North Kolkata">North Kolkata</option>
                        <option value="South Kolkata">South Kolkata</option>
                        <option value="New Town">New Town</option>
                        <option value="Howrah">Howrah</option>
                    </select>

                    {/* State */}
                    <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Pincode */}
                    <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        required
                        className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
                    />

                    {/* Error */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg transition-all duration-200"
                    >
                        {loading ? "Saving..." : "Save Address"}
                    </button>

                    <button
                        type="button"
                        onClick={handleClose} // 🔹 pass a function like setShowAddressModal(false)
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg font-semibold shadow-lg transition-all duration-200"
                    >
                        Cancel
                    </button>

                </form>

                {/* Footer */}
                <p className="mt-8 text-xs text-gray-500 text-center">
                    Your details are safe with <span className="font-semibold text-green-600">FinnoFarms</span> 🌱
                </p>
            </div>
        </div>


    );
};

export default AddAddressPage;
