import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            <Link className='text-2xl w-[1080px] bg-gray-900   my-2 ' to="/home" >Home</Link>
            <br />
            <div className='mt-6'></div>
            <Link  className='text-2xl my-2 mt-10 ' to="/products" >Product</Link>
            <br />
            <div className='mt-6'></div>
            <Link  className='text-2xl  my-2 ' to="/upload-product" >Upload</Link>
        </div>
    )
}

export default LandingPage
