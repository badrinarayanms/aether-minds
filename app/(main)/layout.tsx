export const metadata = {
    title: "AetherMinds",
    description:
      "Elevate learning and well-being to a higher plane, where academic success meets mental clarity.",
  };
  import Link from "next/link";
  import { MdDashboard, MdGrade, MdEmojiEmotions } from "react-icons/md";
  import { TbReport } from "react-icons/tb";
  import { PiChatTeardropTextFill, PiStudentFill } from "react-icons/pi";
  import { FaBell ,FaRegUserCircle} from "react-icons/fa";
  import Image from "next/image";
import React from "react";
  
  export default function RootLayout({children,}: {children: React.ReactNode}) {
    const side = [
      { icon: <MdDashboard className="mr-4" />, title: "Dashboard" },
      { icon: <MdGrade className="mr-4" />, title: "Grades" },
      { icon: <MdDashboard className="mr-4" />, title: "FlashQuest" },
      { icon: <PiChatTeardropTextFill className="mr-4" />, title: "EmoBuddy" },
      { icon: <TbReport className="mr-4" />, title: "Performance Report" },
      { icon: <PiStudentFill className="mr-4" />, title: "Student Community" },
      { icon: <MdEmojiEmotions className="mr-4" />, title: "Emotional Analysis" },
    ];
  
    return (
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon.png"
          />
        </head>
        <body>
          <div className="w-full h-screen flex">
            {/* Sidebar */}
            <div className="w-4/12 h-full">
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
                {side.map((sideitem) => {
                  return (
                    <Link
                      key={sideitem.title}
                      href={`/${sideitem.title.replace(/\s+/g, "").toLowerCase()}`}
                      className="flex items-center text-2xl font-semibold font-gsans mb-10"
                    >
                      {sideitem.icon}
                      {sideitem.title}
                    </Link>
                  );
                })}
              </div>
            </div>
  
          
            <div className="bg-[#C9DCEE] w-full h-screen">
              
              <div className='h-full'>
              <div className="flex items-center justify-between w-full h-1/6 px-6 ">
                
                <div className="flex items-center w-2/3">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
  
    
                <div className="flex items-center space-x-6">
                    <FaBell className="text-3xl cursor-pointer text-gray-600 hover:text-gray-800" />  
                    <div className="flex items-center space-x-4">
                        <Link href='/profile' className="font-semibold text-2xl text-gray-800 flex items-center py-2 px-3">
                        <FaRegUserCircle className="mr-3 text-3xl cursor-pointer text-gray-600 hover:text-gray-800" /> 
                        Badri ms
                        </Link>
                    </div>
                </div>

              </div>
  
              
              <div className='h-5/6'>
                 {children}
              </div>
            </div>
              </div>
          </div>
        </body>
      </html>
    );
  }
  