import React from 'react'
import Image from 'next/image'


const Achievement = () => {
  return (
    <div className="flex justify-center items-center bg-[#D9D9D9] rounded-xl  p-2 my-3  " >
            <Image src='/assets/icon.png'  className="mr-2" width={35}  height={35} alt="logo"></Image>
            <div className=''>
                <h1 className=" font-gsans font-bold  md:text-lg text-lg">Emotional Resilience</h1>
                <p className='font-gsans text-sm font-light'>90% positive emotions</p>
            </div>
    </div>
  )
}

export default Achievement