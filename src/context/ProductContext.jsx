"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { transformSheetData } from "../lib/SheetRuleEngine"
const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [finnoItems, setFinnoItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const sheetId = import.meta.env.VITE_SHEET_ID;
    const sheetName = import.meta.env.VITE_SHEET_NAME;



    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`https://opensheet.elk.sh/${sheetId}/${sheetName}`);
            const data = await res.json();
            setTotalItems(data.length);
            setFinnoItems(transformSheetData(data));
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ProductContext.Provider
            value={{ finnoItems, totalItems, isLoading, fetchProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to consume context
// eslint-disable-next-line react-refresh/only-export-components
export const useProductsContext = () => useContext(ProductContext);
