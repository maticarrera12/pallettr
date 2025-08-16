import React from 'react'
import ColorGrid from './ColorGrid'

const Hero = () => {
  return (
    <div className='flex flex-col min-h-dvh mt-8'>
        <div>
           <h1 className='text-3xl font-bold'>Turn Ideas <br /> Into Art  <br /> With Stunning <br /> <span className='text-tertiary'>Pallete Designs</span>
        </h1> 
                 <p className='text-sm text-theme my-4'>
        Bring your ideas to life with AI-powered color palettes, ready to use in your code and designed for perfect accessibility.
        </p>
        <div className='flex flex-row gap-4'>
            <button className='bg-primary hover:bg-primary-hover active:bg-primary-active text-white rounded-lg font-medium transition-colors px-4 cursor-pointer'>
                Wishlist
            </button>
            <p className='text-sm font-bold text-primary'>
                Talk to me
            </p>
        </div>
        </div>
        <div>
            <ColorGrid />
        </div>
    </div>
  )
}

export default Hero