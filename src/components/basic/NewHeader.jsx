import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import ShoppingCartModal from '../Items/ShoppingCartModal';
import { useUserContext } from '../../context/UserContext';
import { AddressModal } from '../address/AddressModal';


const NewHeader = ({ selectedItems, setSelectedItems }) => {
    const [showCart, setShowCart] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const { user, defaultAddress, addresses } = useUserContext();

    const userMobileNo = user?.mobileNo;
    console.log(user.addresses)

    return (
        <div className="sticky top-0 z-[50] w-full py-3 md:px-6 backdrop-blur-md bg-white shadow-md">
            <div className="relative max-w-6xl mx-auto px-4">
                <div className='flex items-center justify-between h-fit'>
                    {/* Title */}
                    <div className="flex flex-col mb-3">
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
                        className="relative cursor-pointer hover:scale-110 transition-transform"
                    >
                        {selectedItems?.length > 0 && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-lime-500 to-cyan-500 text-white text-xs font-bold px-2 py-[2px] rounded-full shadow-md">
                                {selectedItems?.length}
                            </div>
                        )}
                        <ShoppingCart className="w-7 h-7 mb-1 text-cyan-600 hover:text-lime-600 transition-colors" />
                    </div>

                </div>

                {/* User Info Small Div */}
                <div
                    onClick={() => setShowAddressModal(true)}
                    className="cursor-pointer bg-white hover:bg-cyan-50 border border-gray-200 rounded-xl px-4 py-3 mb-1 shadow-md flex items-center justify-between gap-4 transition"
                >
                    {/* Left: Address + Phone */}
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                            {defaultAddress?.title || "No Address"}
                        </p>
                        <p className="text-xs text-gray-500">{userMobileNo}</p>
                    </div>

                    {/* Right: Change button */}
                    <span className="text-cyan-600 text-sm font-semibold flex items-center gap-1">
                        Change
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>



                {/* Modals */}
                <ShoppingCartModal
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    showCart={showCart}
                />


                <AddressModal
                    show={showAddressModal}
                    user={user}
                    onClose={() => setShowAddressModal(false)}
                    addresses={addresses || []}
                />
            </div>
        </div>
    )
}

export default NewHeader
