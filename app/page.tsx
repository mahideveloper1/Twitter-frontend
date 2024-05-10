
import React, { ReactNode } from 'react'
import Front from '@/components/Front'
import LeftSideBar from '@/components/LeftSideBar';
import MainComponent from '@/components/MainComponent';
import RightSection from '@/components/RightSection';






const Home = () =>{


  return (
    // <Front/>
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
    <div className="xl:max-w-[70vw] w-full h-full flex relative">
      <LeftSideBar/>
      <MainComponent/>
      <RightSection/>
    </div>
  </div>
  );
}
export default Home;
