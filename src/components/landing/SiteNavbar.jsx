import React from 'react'

const SiteNavbar = () => {
    return (
        <div className='w-full bg-white'>
            <div className='flex justify-between items-center w-full max-w-7xl mx-auto py-3'>
                <h1 className='text-xl font-bold text-black'>Finno Farms</h1>

                <button className='py-2 px-4 bg-green-800 text-white rounded'>Shop Now</button>
            </div>
        </div>
    )
}

export default SiteNavbar