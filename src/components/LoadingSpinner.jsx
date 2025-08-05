import { Loader2, ShoppingBag } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
            <div className="text-center">
                <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <ShoppingBag className="w-8 h-8 text-primary" />
                    </div>
                    <Loader2 className="w-6 h-6 text-primary animate-spin absolute -top-1 -right-1" />
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-2">
                    Loading Fresh Items
                </h2>
                <p className="text-muted-foreground text-sm">
                    Preparing the best selection for you...
                </p>

                <div className="flex justify-center mt-4">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;