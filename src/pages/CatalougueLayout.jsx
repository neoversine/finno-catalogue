"use client";
import React, { useEffect } from "react";
import HomePage from "./HomePage"; // import your HomePage component
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CatalougueLayout = () => {
    const { user, loading, addresses } = useUserContext();

    const navigate = useNavigate()
    useEffect(() => {
        if ((!addresses || addresses.length) === 0) {
            navigate('/add-address');
        }
    }, [user, addresses, navigate]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <HomePage />
    );
};

export default CatalougueLayout;
