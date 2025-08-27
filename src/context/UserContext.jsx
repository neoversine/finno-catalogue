"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState();
    const [sector, setSector] = useState("");

    const fetchProfile = async () => {
        const token = Cookies.get("accessToken");

        if (!token) {
            setIsLoggedIn(false);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/auth/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data.success) {
                setUser(data.data);
                setIsLoggedIn(true);

                if (!data.data.addresses || data.data.addresses.length === 0) {
                    setShowAddressModal(true);
                }
                else {
                    setDefaultAddress(data.data.addresses.filter((ele) => ele.isDefault = true)[0]);
                }
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
                showAddressModal,
                setShowAddressModal,
                defaultAddress,
                setDefaultAddress,
                sector,
                setSector,
            }}
        >
            {!loading && children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => { return useContext(UserContext) };
