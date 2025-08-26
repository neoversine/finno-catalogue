"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

// Create Context
const UserContext = createContext(null);

// ✅ Provider Component
export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
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
            } else {
                Cookies.remove("accessToken");
                setIsLoggedIn(false);
                window.location.href = "/login";
            }
        } catch (err) {
            console.error("Profile fetch failed:", err);
            Cookies.remove("accessToken");
            setIsLoggedIn(false);
            window.location.href = "/login";
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// ✅ Custom Hook (safe to export with Fast Refresh)
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
