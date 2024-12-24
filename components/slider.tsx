"use client"

import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from 'next/image';

const slider= [
  '/./img/baner/iphone.jpeg',
  '/./img/baner/xiaomi.webp',
  '/./img/baner/samsung.webp',
  '/./img/baner/honor.webp'
]

export default function Slider() {
  const [currentIndex, setCurrentIndex]= useState(0);

  const next= () =>{
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slider.length);
  }
  const prev= () =>{
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slider.length) % slider.length);
  }

  useEffect(() =>{
    setInterval(() =>{
      next();
    }, 10000)
  }, []);

  return (
    <section className="slider relative">
      <button className='hidden sm:block p-3 rounded-e-3xl bg-blue-500 text-white absolute bottom-[45%]' onClick={prev}><FaChevronRight/></button>
      <Image className='rounded-3xl' src={slider[currentIndex]} alt='' width={1400} height={291}/>
      <button className='hidden sm:block p-3 rounded-s-3xl bg-blue-500 text-white absolute left-0 bottom-[45%]' onClick={next}><FaChevronLeft/></button>
    </section>
  )
}