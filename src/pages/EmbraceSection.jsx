import React from 'react'

const EmbraceSection = () => {
    return (
        <div className='w-full bg-[#f7c054]'>
            <div className='flex w-full max-w-7xl mx-auto'>
                <div className='flex flex-col justify-center gap-3 w-1/2 ml-auto'>
                    <p className='text-amber-950'>Discover the Difference</p>

                    <h1 className='text-green-950 text-5xl font-bold'>Embrace the Harvest</h1>

                    <p className='text-sm text-amber-950'>Unlock the hidden gems of our farm-fresh produce. From juicy tomatoes to crisp greens</p>

                    <button className='w-fit py-3 px-5 mt-3 bg-[#109c31] rounded-md text-white font-semibold tracking-wide'>Learn More</button>

                </div>

                <div className='w-1/2'>
                    <img src="/landing/fruits.png" alt="" className='w-full' />
                </div>
            </div>
        </div>
    )
}

export default EmbraceSection