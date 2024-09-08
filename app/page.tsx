import React from 'react';
import Feature, { ftype } from '@/components/Feature';
import Image from 'next/image'

import Link from 'next/link';




const features:ftype[]=[{title:"Emotion Analysis Warning",desc:"Real-time detection of negative emotions in student inputs to provide timely support and alerts."},{title:"Grade Prediction",desc:"Predict future academic performance using machine learning models based on historical student data."},{title:"Interactive Flashcards",desc:"Engage students with a self-quizzing flashcard system to reinforce learning."},{title:"Gamified Learning",desc:"Boost student engagement through levels, points, and rewards integrated into the learning experience."},{title:"Mental Health Chatbot",desc:"Provide confidential mental health support and resources through a multilingual chatbot."},{title:"Student Community Hub",desc:"A moderated space for students to connect, share ideas, and offer mutual support."},];
const page = () => {
  return (
    <div className="w-full h-full">
       <div className="flex justify-between py-4 border-b-2 items-center md:px-14 px-5 md:py-7 ">
      <div className="flex justify-between items-center" >
          <Image src='/assets/icon.png'  className="mr-2" width={40}  height={40} alt="logo"></Image>
          <h1 className=" font-gsans font-bold  md:text-3xl text-xl">AetherMinds</h1>
      </div>
      <div className="items-center">
      <div className="flex gap-5 items-center">
          <Link href='/sign-in'><button className="font-gsans md:font-medium text-white md:text-xl md:px-6 py-2 px-4 font-bold text-sm rounded-lg bg-Aether hover:opacity-90 transition-opacity duration-300">Login</button></Link>
          <Link href='/sign-up'><button className="font-gsans md:font-medium text-white md:text-xl md:px-6 py-2 px-4 font-bold text-sm rounded-lg bg-Aether hover:opacity-90 transition-opacity duration-300">Sign up</button></Link>
      </div>
      </div>
  </div>
    <div className=" bg-[url('/assets/grid.png')] bg-cover bg-center bg-no-repeat  mb-0  h-screen w-full text-center">
        <div className="h-full flex flex-col justify-center items-center">
            <h1 className="min-[320px]:text-5xl font-gsans font-bold text-6xl -mt-[12rem]  md:text-8xl xl:text-9xl">AetherMinds</h1>
            <p className="min-[320px]:text-sm font-gsans font-light text-lg  mt-2 md:text-3xl xl:text-4xl ">Elevate learning and well-being to a higher plane, <br/>where academic success meets mental clarity.</p>
            <div className="items-center mt-14 min-[320px]:mt-7">
                <Link href='/dashboard'><button className="min-[320px]:px-8 min-[320px]:text-4xl  font-gsans font-normal text-white text-5xl md:px-20 py-3 px-14  xl:px-28 xl:p rounded-2xl bg-Aether hover:opacity-90 transition-opacity duration-300">Get Started</button></Link>
            </div>
        </div>
        
    </div>
    <div className='  w-full h-auto flex flex-col items-center h-full lg:-mt-60 lg:flex-row-reverse lg:px-10 lg:py-1 mb-24 min-[1440px]:-mt-52'>
      
      <div className="flex flex-col justify-center items-center text-center lg:ml-5 lg:items-start lg:text-start 2xl:mr-72"> 
  
        <h1 className="font-gsans font-bold text-6xl min-[320px]:text-5xl md:text-8xl lg:text-7xl lg:text-start xl:text-9xl bg-gradient-to-r from-[#5EA6C9] to-[#0B5D86] text-transparent bg-clip-text">EMO-BUDDY</h1>
        <p className="font-gsans font-light text-lg mt-2 min-[320px]:text-sm md:text-3xl lg:text-start  xl:text-4xl text-center">Provide confidential mental health support <br/>and resources through a multilingual chatbot.</p>
      
        <div className="items-center mt-8"> 
        <Link href='/dashboard'><button className="font-gsans font-normal text-white text-3xl md:px-20 py-3 px-28 xl:px-28 rounded-2xl bg-Aether hover:opacity-90 transition-opacity duration-300">Try Now</button></Link>
        </div>
      </div>
     
      <div className="  w-full lg:w-[40%] min-[1440px]:w-[35%] flex justify-start items-start  min-[1440px]:h-[900px]  h-[600px] xl:h-[400px] relative mt-8 md:mt-14 "> 
        <Image 
          src="/assets/emobuddy.png" 
          className="object-contain absolute mt-0" 
          alt="Emobuddy" 
          fill 
        />
      </div>
    </div>
    <div className="w-full h-auto flex flex-col items-center h-full lg:-mt-60 lg:flex-row lg:px-10 lg:py-1 bg-[url('/assets/bluebg.png')] bg-cover bg-top bg-no-repeat ">
      
      <div className="flex flex-col justify-center items-center text-center lg:ml-5 lg:items-start lg:text-start 2xl:mr-72"> 
  
        <h1 className="font-gsans font-bold text-5xl mb-3 min-[320px]:text-4xl md:text-7xl lg:text-6xl  min-[1440px]:text-7xl 2xl:text-8xl lg:text-start xl:text-9xl lg:w-full bg-gradient-to-r from-[#5EA6C9] to-[#0B5D86] text-transparent bg-clip-text">Emotion Analysis <br/> Warning</h1>
        <p className="font-gsans font-light text-lg min-[320px]:text-sm mt-2 md:text-3xl lg:text-start  xl:text-4xl text-center">Real-time detection of negative emotions<br/> in student inputs to provide timely support and alerts.
        </p>
      
        <div className="items-center mt-8"> 
        <Link href='/dashboard'><button className="font-gsans font-normal text-white text-3xl md:px-20 py-3 px-28 xl:px-28 rounded-2xl bg-Aether hover:opacity-90 transition-opacity duration-300">Try Now</button></Link>
        </div>
      </div>
     
      <div className="w-full md:w-[80%] lg:w-[50%] min-[1440px]:w-[70%] 2xl:w-[50%] flex justify-start items-start  min-[1440px]:h-[900px]  h-[600px] xl:h-[400px] relative -mt-20  md:mt-14 "> 
        <Image 
          src="/assets/emotional.png" 
          className="object-contain absolute  " 
          alt="emotional" 
          fill 
        />
      </div>
    </div>
    <div className="w-full h-screen">
        <div className="flex flex-col justify-center items-center text-center lg:ml-5 lg:items-start lg:text-start 2xl:mr-72 p-5 py-7"> 
  
            <h1 className="font-gsans font-bold text-4xl mb-3 md:text-7xl lg:text-6xl  min-[1440px]:text-7xl 2xl:text-8xl lg:text-start xl:text-9xl lg:w-full ">Why choose us ?</h1>
            <p className="font-gsans font-light text-[0.8rem] font-semibold md:font-medium mt-2 md:text-3xl lg:text-start md:text-2xl xl:text-4xl text-center">Choose us for a balanced approach to learning and well-being.<br/> Enjoy engaging tools and personalized support</p>
        </div>

        <div className="w-full p-10">
            <div className="flex  justify-evenly flex-wrap">
                {features.map((feature,index)=>{
                    return < Feature key={index} title={feature.title} desc={feature.desc}/>
                })}
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default page