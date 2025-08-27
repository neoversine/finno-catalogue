"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HomePage from "./HomePage"; // import your HomePage component
import AddressModal from "./AddAddressPage"; // modal to collect address
import { useUserContext } from "../context/UserContext";
import AddAddressPage from "./AddAddressPage";
import { useNavigate } from "react-router-dom";

const CatalougueLayout = () => {
    const { user, loading } = useUserContext();
    const [showAddressModal, setShowAddressModal] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {
        if (user && (!user.addresses || user?.addresses.length) === 0) {
            navigate('/add-address');
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
                <AddAddressPage onClose={() => setShowAddressModal(false)} />
            ) : (
                <HomePage />
            )}
        </div>
    );
};

export default CatalougueLayout;
