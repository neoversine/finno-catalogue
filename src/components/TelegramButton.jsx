import { useState, useEffect } from "react";
import { Send, Loader2, ShoppingBag, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Switch from "./Switch";
import OrderButton from "./OrderButton";
import { notify } from "../lib/Toaster";
// import { useToast } from "@/hooks/use-toast";

const TelegramButton = ({ address, selectedItems, setSelectedItems }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mobile, setMobile] = useState("");
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [showMobileInput, setShowMobileInput] = useState(false);
    // const { toast } = useToast();

    useEffect(() => {
        const savedMobile = localStorage.getItem("userMobile");
        if (savedMobile) {
            setMobile(savedMobile);
        }
    }, []);

    const formatItemsForWebhook = () => {
        return selectedItems.map(item => ({
            name: item.name,
            price: item.price,
            unit: item.unit,
            selectedCut: item.selectedCut,
            selectedCutSize: item.selectedCutSize,
            selectedQuantity: item.selectedQuantity,
            totalPrice: item.totalPrice,
            totalQuantity: item.totalQuantity,
            // stock: item.stock > 0 ? "In Stock" : "Out of Stock"
        }));
    };

    const handleSubmitOrder = async () => {
        console.log(selectedItems)
        const isValidMobile = /^[6-9]\d{9}$/.test(mobile.trim());

        if (!isValidMobile) {
            setShowMobileInput(true);
            notify("Please enter a valid mobile number!", "warning");
            return;
        }

        setIsLoading(true);

        try {
            localStorage.setItem("userMobile", mobile);

            const webhookData = {
                cashOnDelivery: cashOnDelivery,
                address: address,
                mobile: mobile.trim(),
                items: formatItemsForWebhook()
            };

            console.log(webhookData);

            const response = await fetch("https://n8n.finnofarms.in/webhook/4b09e954-9fa8-4639-a035-af152d6ba34e", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(webhookData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSelectedItems([]);
            navigate('/complete-your-payment')

            // toast({
            //     title: "Order Submitted Successfully! 📤",
            //     description: "We'll reach out on WhatsApp after reviewing your selection.",
            // });

        } catch (error) {
            console.error("Error submitting order:", error);
            // toast({
            //     title: "Submission Failed",
            //     description: "Failed to submit your order. Please try again.",
            //     variant: "destructive",
            // });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-lg">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                    {/* Contact & Payment Section */}
                    <div className="flex flex-row items-center md:items-end gap-6">

                        {/* Mobile Number Input */}
                        <div>
                            <label
                                htmlFor="mobile"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                <div className="flex items-center gap-1">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span>Mobile Number</span>
                                </div>
                            </label>
                            <input
                                id="mobile"
                                type="tel"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-52 md:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                            />
                        </div>

                        {/* Cash on Delivery Toggle */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
                            <Switch
                                checked={cashOnDelivery}
                                onChange={(e) => setCashOnDelivery(e.target.checked)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmitOrder}
                            disabled={isLoading}
                            className="flex items-center justify-center bg-white text-white text-sm font-semibold rounded-lg shadow transition disabled:opacity-50"
                        >
                            {isLoading ? <OrderButton type="Loading" /> : <OrderButton />}
                        </button>
                    </div>
                </div>

                {/* Footer Helper Text */}
                <p className="text-xs text-center text-gray-500 mt-3">
                    Select items from the catalog and place your order
                </p>
            </div>
        </div>

    );
};

export default TelegramButton;
