import React from 'react'

const Footer = () => {
  return (
    <footer className='px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300'> 
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14" >
      <p className='pt-4 text-center text-sm pb-5'>
         Copyright {new Date().getFullYear()} © GoCinemas. All rights reserved.
      </p>
      </div>
    </footer>
  )
}

export default Footer
