import React from 'react'
import { assets } from '../../assets/assets';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/700'>
      
      <h1 
        className='relative font-bold text-gray-800 max-w-3xl mx-auto' 
        style={{ fontSize: '32px', lineHeight: '40px', 
                 md: { fontSize: '56px', lineHeight: '66px' } }}
      >
        Improve your Future with the courses designed to 
        <span className='text-blue-600'> fit your choice.</span> 
        <img src={assets.sketch} alt='sketch' className='md:block hidden absolute -bottom-7 right-0'/>
      </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto' style={{ fontSize: '16px', lineHeight: '24px' }}>
        We bring together world-class instructor, interactive content, supportive community to help you achieve your personal and professional goals.
      </p>

      <p className='md:hidden text-gray-500 mx-w-sm mx-auto' style={{ fontSize: '16px', lineHeight: '24px' }}>
        We bring together world-class instructor, to help you achieve your professional goals
      </p>
      <SearchBar />
    </div>
  )
}

export default Hero;

