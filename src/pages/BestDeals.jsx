import React from 'react'

const BestDeals = () => {
    return (
        <div className='flex w-full bg-white'>
            <div className='flex flex-col w-full max-w-7xl mx-auto py-10'>
                <div className='flex flex-col mx-auto mb-10'>
                    <p className='text-center'>Explore our pantry</p>
                    <h1 className='text-4xl font-semibold text-center'>Best Deals</h1>
                </div>
                <div className='grid grid-cols-3 gap-10 max-w-6xl w-full mx-auto'>
                    {
                        [1, 2, 3, 3, 1, 2].map((ele, i) => (
                            <div key={i} className='relative w-full pt-10 pb-7 bg-[#fef7e2]'>
                                <div className='absolute top-4 right-4 py-[17px] px-[10px] rounded-full bg-red-600 text-white'>
                                    -10%
                                </div>
                                <div className='w-full h-[150px]'>
                                    <img src={`/landing/products/${ele}.png`} alt="" className='object-cover h-full mx-auto' />
                                </div>
                                <div className='flex flex-col items-center w-full mt-4'>
                                    <p className='text-center'>1.5kg Apple + 2Kg Pineapple</p>
                                    <p className='mt-2 text-xl font-bold text-amber-900'>$20</p>
                                </div>
                                <div className='flex justify-center'>
                                    <button className='bg-amber-950 text-white py-2 px-5 mt-3'>Add To Cart</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default BestDeals