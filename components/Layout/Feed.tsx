import { Tweet } from '@/gql/graphql';
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import {  BsThreeDots } from 'react-icons/bs';
import { FaRetweet } from 'react-icons/fa';
import Image from 'next/image'
import Link from 'next/link';


interface FeedCardProps{
  data:Tweet
}

const Feed :React.FC<FeedCardProps> = (props) => {
  const {data} = props

  return (
    
    
    <div className="flex flex-col">
    <div className="border-b border-gray-600 p-2 flex flex-col md:flex-row">
      <div>
        {/* Avatar column FeedCard */}
        <div className="w-11 h-11 bg-slate-400 rounded-full mx-1 flex-none">  
        { data.author?.profileImageUrl&&  <Image  className='rounded-full object-cover   ' src ={data.author.profileImageUrl} width={50}  height={50} alt="user-img"/>}

        
        </div>
      </div>
      {/* Side Tweet Flex col */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 w-full">
          <Link  href ={`/user/${data.author?.id}`}>
            <div className="font-bold">
              {/* User Name */}
              {data.author?.firstName} { data.author?.lastName}
            </div>
            </Link>
            <div className="text-gray-500">@.</div>
            <div className="text-gray-500">
              {/* Times 3s ago */}
              3min
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        {/* Tweet Text */}
        <div className="text-white flex flex-wrap text-base w-full cursor-pointer hover:bg-white/5 transition-all">
        {data.content}        
        </div>
        <div className="\ flex w-full rounded-xl mt-2">
        {data?.imageUrl && <Image  src ={data.imageUrl} width={550}  height={20} alt="user-img"/>}

        </div>
        <div className="flex items-center justify-evenly  mt-2 w-full">
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <BiMessageRounded />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <FaRetweet />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <AiOutlineHeart />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <BiUpload />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <BiUpload />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Feed