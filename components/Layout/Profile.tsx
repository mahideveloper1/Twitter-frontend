"use client"

import { userCurrentUser } from '@/hooks';
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Image from 'next/image'


const Profile = () => {
    const {user} = userCurrentUser();

  return (
    <button className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between">
  <div className="flex items-center space-x-2">
    <div className="">   {user && user.profileImageUrl&&(<Image className=' rounded-full ' height={50} width={50}  alt="user-image"src={user?.profileImageUrl }/>)}
 </div>
    <div className="text-left text-sm">
      <div className="font-semibold">
        {user?.firstName}
      </div>
      <div className="">@{user?.lastName}</div>
    </div>
  </div>
  <div>
    <BsThreeDots />
  </div>
</button>
  )
}

export default Profile