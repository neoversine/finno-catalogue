"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HomePage from "./HomePage"; // import your HomePage component
import AddressModal from "./AddressModal"; // modal to collect address
import { useUserContext } from "../context/UserContext";

const CatalougueLayout = () => {
    const { user, loading } = useUserContext();
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        if (user && (!user.addresses || user?.addresses.length) === 0) {
            setShowAddressModal(true);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            {showAddressModal ? (
                <AddressModal onClose={() => setShowAddressModal(false)} />
            ) : (
                <HomePage />
            )}
        </div>
    );
};

export default CatalougueLayout;
