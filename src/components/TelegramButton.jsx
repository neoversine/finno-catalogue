import { useState, useEffect } from "react";
import { Send, Loader2, ShoppingBag, Phone } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

const TelegramButton = ({ address, selectedItems, totalItems }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mobile, setMobile] = useState("");
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
            selectedQuantity: item.selectedQuantity,
            totalPrice: item.totalPrice,
            totalQuantity: item.totalQuantity,
            // stock: item.stock > 0 ? "In Stock" : "Out of Stock"
        }));
    };

    const handleSubmitOrder = async () => {
        console.log(selectedItems)
        if (!mobile.trim()) {
            setShowMobileInput(true);
            alert({
                title: "Mobile Number Required",
                description: "Please enter your mobile number to submit your order",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            localStorage.setItem("userMobile", mobile);

            const webhookData = {
                address: address,
                mobile: mobile.trim(),
                items: formatItemsForWebhook()
            };

            console.log(webhookData);

            const response = await fetch("https://n8n.finnofarms.in/webhook-test/4b09e954-9fa8-4639-a035-af152d6ba34e", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(webhookData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

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
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-border/50 p-4 z-50">
            <div className="max-w-7xl mx-auto">
                {/* Selection Summary */}
                <div className="mb-1 text-center">
                    <p className="text-sm text-muted-foreground">
                        {selectedItems.length > 0 ? (
                            <>
                                <ShoppingBag className="w-4 h-4 inline mr-1" />
                                {selectedItems.length} of {totalItems} items selected
                            </>
                        ) : (
                            `Browse ${totalItems} available items`
                        )}
                    </p>
                </div>

                <div className="flex items-center gap-3 max-w-md mx-auto">
                    {/* Mobile Number Input */}
                    {(
                        <div className="w-1/2 mb-4 space-y-2">
                            <label htmlFor="mobile" className="text-sm font-medium">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Mobile Number
                            </label>
                            <input
                                id="mobile"
                                type="tel"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmitOrder}
                        disabled={isLoading}
                        className="w-1/2 text-base py-2  h-fit mx-auto shadow-lg bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Submitting your order...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Submit Your Order
                            </>
                        )}
                    </button>

                </div>

                <p className="text-xs text-center text-muted-foreground mt-2">
                    {selectedItems.length > 0
                        ? "We'll reach out on WhatsApp after reviewing your selection."
                        : "Select items from the catalog to place your order"
                    }
                </p>
            </div>
        </div>
    );
};

export default TelegramButton;
