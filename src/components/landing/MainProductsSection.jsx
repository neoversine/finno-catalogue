import { Send } from 'lucide-react'
import React from 'react'

const MainProductsSection = () => {
    return (
        <div className='bg-white'>
            <div className='grid grid-cols-2 gap-7 w-full max-w-6xl p-10 my-10 mx-auto'>
                <div className='w-full px-10'>
                    <img src="/landing/main-product.png" alt="plate" className='w-full' />
                </div>

                <div className='flex items-center h-full px-10'>
                    <div className='flex flex-col mx-auto '>
                        <h1 className='text-3xl text-green-950 font-bold mb-3'>Savor the Flavours</h1>

                        <p className='mb-10 text-green-900'>Get your products delivered fresh to you plate from farms</p>

                        <div className='flex items-center gap-2 w-full mb-8'>
                            <input type="text" className='grow py-2 border-2 border-green-800 rounded' />
                            <Send />
                        </div>


                        <div className='grid grid-cols-2 gap-14 w-full'>
                            <div className='flex flex-col gap-2 justify-center'>
                                <img src="/landing/fins.png" alt="" className='w-full h-[250px]' />
                                <p className='text-center font-semibold tracking-wide'>Fish</p>
                            </div>
                            <div className='flex flex-col gap-2 justify-center'>
                                <img src="/landing/fins.png" alt="" className='w-full h-[250px]' />
                                <p className='text-center font-semibold tracking-wide'>Farm Fresh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProductsSection