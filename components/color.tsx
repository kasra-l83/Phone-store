"use client"

import { useState } from 'react';
import { FaCheck } from "react-icons/fa";

const ColorSelector= () =>{
  const [selectedIndex, setSelectedIndex]= useState<number>(0);

  const select= (index: number) =>{
    setSelectedIndex(index);
  }

  return (
    <>
      <h4 className="text-base font-semibold">رنگ: {selectedIndex=== 0? "سبز": selectedIndex=== 1? "مشکی": selectedIndex=== 2? "خاکستری": selectedIndex=== 3? "آبی": "صورتی"}</h4>
      <div className='flex gap-x-2'>
        {[...Array(5)].map((_, index) =>(
          <span key={index} onClick={() => select(index)}
            className={`size-8 border-2 rounded-full flex justify-center items-center cursor-pointer ${index===1 ? "bg-black" : index===2 ? "bg-gray-200" : index===3 ? "bg-blue-500" : index===4 ? "bg-pink-500" : "bg-green-500"}`}
          >
            {selectedIndex=== index && <span className='text-white'><FaCheck/></span>}
          </span>
        ))}
      </div>
    </>
  )
}
export default ColorSelector;