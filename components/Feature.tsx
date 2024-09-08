import React from 'react'
export type ftype={title:string,desc:string}
const Feature = ({title,desc}:ftype) => {
  
  return (
    <div className=' relative m-3 min-[320px]:w-[250px]  max-[768px]:w-[300px] max-[768px]:h-44 w-[400px] h-60'>
        <div className="bg-[#B1CDE6] min-[320px]:w-[250px] max-[768px]:w-[300px]   w-[400px] max-[768px]:h-44 h-60 rounded-3xl  flex flex-row justify-center items-center "></div>
        <div className="bg-[#B1CDE6] min-[320px]:w-[250px] max-[768px]:w-[300px] max-[768px]:h-44 drop-shadow-xl w-[400px] h-60 rounded-3xl absolute -top-3 left-2 flex flex-col p-10  justify-center">
            <h1 className="font-gsans max-[768px]:text-sm font-bold text-xl">{title}</h1>
            <p className="font-sans font-medium text-lg max-[768px]:text-sm mt-2">{desc}</p>
            
        </div>
    </div>
  )
}

export default Feature