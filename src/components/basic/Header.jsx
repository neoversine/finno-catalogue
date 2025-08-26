import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { GiCrossMark } from 'react-icons/gi';
import ShoppingCartModal from '../Items/ShoppingCartModal';

const Header = ({ selectedItems, setSelectedItems }) => {
    const [showCart, setShowCart] = useState(false);

    return (
        <div className="sticky top-0 z-[10] w-full py-2 px-3 md:px-5 backdrop-blur-md bg-white shadow-lg">
            {/* Main Header */}
            <div className="relative max-w-5xl mx-auto">
                {/* Title & Subtitle */}
                <div className="md:text-center mb-2">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 via-cyan-500 to-green-900 bg-clip-text text-transparent mb-1">
                        Finno Farms Market
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Premium quality, delivered fresh
                    </p>
                </div>

                {/* Cart Icon */}
                <div
                    onClick={() => setShowCart((prev) => !prev)}
                    className="absolute z-[10] top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:scale-110 transition-transform"
                >
                    {/* Cart Count Badge */}
                    {selectedItems?.length > 0 && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-lime-500 to-cyan-500 text-white text-xs font-bold px-2 py-[2px] rounded-full shadow-md">
                            {selectedItems?.length}
                        </div>
                    )}
                    <ShoppingCart className="w-7 h-7 text-cyan-600 hover:text-lime-600 transition-colors" />
                </div>

                {/* Cart Modal */}
                <ShoppingCartModal
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    showCart={showCart}
                />
            </div>
        </div>

    )
}

export default Header