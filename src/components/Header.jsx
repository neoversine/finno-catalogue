import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { GiCrossMark } from 'react-icons/gi';
import ShoppingCartModal from './Items/ShoppingCartModal';

const Header = ({ selectedItems, setSelectedItems }) => {
    const [showCart, setShowCart] = useState(false);

    return (
        <div className='sticky top-0 z-[10] w-full py-2 px-3 md:px-5 backdrop-blur-md bg-white shadow'>
            {/* Main Header */}
            <div className="relative max-w-5xl mx-auto ">
                <div className="md:text-center mb-2">
                    <h1 className="text-3xl font-bold text-gradient mb-1">
                        Finno Farms Market
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Premium quality, delivered fresh
                    </p>
                </div>
                <div onClick={() => setShowCart(prev => !prev)} className='absolute z-[10] top-1/2 -translate-y-1/2 right-2 cursor-pointer'>
                    <div className='absolute -top-[14px] -right-2 text-orange-600'>{selectedItems?.length}</div>
                    <ShoppingCart />
                </div>
                <ShoppingCartModal selectedItems={selectedItems} setSelectedItems={setSelectedItems} showCart={showCart} />
            </div>
        </div >
    )
}

export default Header