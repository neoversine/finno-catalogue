"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../lib/axiosInstance";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState();
    const [addresses, setAddresses] = useState([]);
    const [sector, setSector] = useState("");

    const fetchProfile = async () => {
        const token = Cookies.get("accessToken");

        if (!token) {
            setIsLoggedIn(false);
            setLoading(false);
            return;
        }

        try {
            const profileRes = await axiosInstance.get("/auth/profile");

            const data = profileRes.data;
            console.log(data);

            if (data.success) {
                setUser(data.data);
                setAddresses(data.data.addresses);

                // pick default address if exists
                const defaultAddr = data.data.addresses.find((addr) => addr.isDefault === true);
                if (defaultAddr) {
                    console.log(defaultAddr);
                    setDefaultAddress(defaultAddr);
                }
                setIsLoggedIn(true);
            } else {
                Cookies.remove("accessToken");
                setIsLoggedIn(false);
            }
        } catch (err) {
            console.error("Profile fetch failed:", err);
            Cookies.remove("accessToken");
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddresses = async () => {
        try {
            // Get all addresses
            const addressRes = await axiosInstance.get("/address/all");

            const data = addressRes.data;

            console.log("Addresses:", data);

            if (data.success) {
                // Assuming backend sends { success: true, data: [...] }
                setAddresses(data.data);

                // pick default address if exists
                const defaultAddr = data.data.find((addr) => addr.isDefault === true);
                if (defaultAddr) {
                    console.log(defaultAddr);
                    setDefaultAddress(defaultAddr);
                }
            } else {
                console.error("Failed to fetch addresses:", data.message);
            }
        } catch (err) {
            console.error("Address fetch failed:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loading,
                isLoggedIn,
                fetchProfile,
                fetchAddresses,
                showAddressModal,
                setShowAddressModal,
                defaultAddress,
                setDefaultAddress,
                addresses,
                setAddresses,
                sector,
                setSector,
            }}
        >
            {!loading && children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => { return useContext(UserContext) };
