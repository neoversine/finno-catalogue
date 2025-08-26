import React from 'react'

const HeroSection = () => {
    return (
        <div className='flex justify-center w-full bg-[#D1E6BC]'>
            <div className='flex gap-10 w-full h-full max-w-7xl py-10'>
                <div className='h-full w-1/2'>
                    <img src="/landing/hero-img.png" alt="Hero Image" className='object-cover h-full w-full' />
                </div>

                <div className='flex flex-col justify-center gap-3 w-1/2 ml-auto'>
                    <p className='text-green-900'>Explore Our Fresh Produce</p>

                    <h1 className='text-green-950 text-5xl font-bold'>Discover the Finest Farm-to-Table Offerings</h1>

                    <p className='text-sm text-green-900'>Welcome to our online farm market, where the freshest and most delicious fruits, vegetables, fish, and seafood are just a click away</p>

                    <button className='w-fit py-3 px-5 mt-3 bg-[#0D7D27] rounded-md text-white'>Shop Now</button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection