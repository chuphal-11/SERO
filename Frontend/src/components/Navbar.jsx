import React from 'react'
import Search from './Search'
const Navbar = () => {
  return (
    <>
        <div className=''>
            <div><h2>SERO</h2></div>
            <div></div>
           <Search/>
            <div className='flex flex-row gap-4'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>SignUp</button>
            </div>  
        </div>
    
    </>
  )
}

export default Navbar