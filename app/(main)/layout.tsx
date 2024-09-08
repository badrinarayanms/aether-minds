'use client';
import Link from "next/link";
import { MdDashboard, MdGrade, MdEmojiEmotions } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { PiChatTeardropTextFill, PiStudentFill } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';


const side = [
  { icon: <MdDashboard className="mr-4" />, title: "Dashboard" },
  { icon: <MdGrade className="mr-4" />, title: "Grades" },
  { icon: <MdDashboard className="mr-4" />, title: "FlashQuest" },
  { icon: <PiChatTeardropTextFill className="mr-4" />, title: "EmoBuddy" },
  { icon: <TbReport className="mr-4" />, title: "Performance Report" },
  { icon: <PiStudentFill className="mr-4" />, title: "Student Community" },
  { icon: <MdEmojiEmotions className="mr-4" />, title: "Emotional Analysis" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isSignedIn, isLoaded,user } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push('/dashboard'); // Redirect to dashboard if authenticated
      } else {
        router.push('/sign-in'); // Redirect to sign-in page if not authenticated
      }
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
  }
  
  console.log('hello');
  return (
    
    
        <div className="w-full h-screen flex">
          {/* Sidebar */}
          <div className="w-1/4 h-full bg-white ">
            <div className="flex h-32 justify-center items-center">
              <Image
                src="/assets/icon.png"
                className="mr-2"
                width={40}
                height={40}
                alt="logo"
              />
              <h1 className="font-gsans font-bold md:text-3xl text-xl">
                AetherMinds
              </h1>
            </div>
            <div className="p-14">
              {side.map((sideitem) => (
                <Link
                  key={sideitem.title}
                  href={`/${sideitem.title.replace(/\s+/g, "").toLowerCase()}`}
                  className="flex items-center text-3xl  font-semibold mb-10 text-gray-800"
                >
                  {sideitem.icon}
                  {sideitem.title}
                </Link>
              ))}
            </div>
          </div>
         

          <div className="flex-1 bg-[#C9DCEE] flex flex-col">
            <div className='flex  items-center justify-around w-full h-24 px-6 '>
              <input
                type="text"
                placeholder="Search"
                className="w-[80%] px-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex items-center  space-x-6">
                <FaBell className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800" />
                <div className="flex items-center space-x-4">
                  <UserButton />
                  <Link href='/profile' className="font-semibold text-2xl text-gray-800 flex items-center">
                    {user.fullName}
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex-1 p-6'>
              {children}
            </div>
          </div>
        </div>
      
  );
}
