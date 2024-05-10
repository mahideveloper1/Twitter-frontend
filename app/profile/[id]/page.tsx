"use client"
import { type NextRequest } from 'next/server'

import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/Layout/TwitterLayout"
import { Tweet, User } from "@/gql/graphql";
import { getUserByIdQuery } from "@/graphql/query/user";
import { userCurrentUser } from "@/hooks";
import { Query, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";

import { BsArrowLeftShort } from "react-icons/bs"
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnfollowUserMutation, followUserMutation } from '@/graphql/mutation/user';


  
export default  function Profile({params,searchParamas}:any){
  const {user} = userCurrentUser();
  const queryClient = useQueryClient();
  // const data = GetUser(params.id)
  // console.log(data);
  const [userData, setUserData] = useState<User>();
 
  const handleFollowerUser = useCallback(async()=>{
    if(!userData) return;
    await graphqlClient.request(followUserMutation,{to:userData?.id})
    queryClient.invalidateQueries({ queryKey: ['current-user'] });

  },[userData?.id,queryClient])
  const handleUnFollowUser =useCallback(async()=>{
    if(!userData) return;
    await graphqlClient.request(UnfollowUserMutation,{to:userData?.id})
    queryClient.invalidateQueries({ queryKey: ['current-user'] });

  },[userData?.id,queryClient])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUser(params.id);
        if (data === "notFound") {
          console.log("User not found");
        } else {
          setUserData(data.getUserById as User);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const amIFollowing = useMemo(()=>{
    if(!userData) return false
    return(
      (user?.following?.findIndex((el)=>el?.id===userData?.id)??-1)<0
    )
    
  },[user?.following,userData?.id])

  
 



    return(
     
     
        <Twitterlayout>
          
          <div>
              <div>
          <nav className=" flex items-center gap-3 p-3">
            <BsArrowLeftShort className="text-4xl"/>
            <div>
              <h1  className="text-2xl font-bold">{userData?.firstName}</h1>
              <h1 className=" text-xs  text-gray-500 ">{userData?.tweets?.length} Tweets</h1>
            </div>


          </nav>
        </div>


<div className="container mx-auto p-4">
<div className="flex">
  <div className="mr-4">
    
    <img
      className="w-20 h-20 rounded-full"
      src={userData?.profileImageUrl  ?? "https://placekitten.com/200/200"} 
      alt="Profile"
    />
  </div>
  <div>
    <h2 className="font-bold text-xl">{userData?.firstName}</h2>
    <p className="text-gray-500">@{userData?.id}</p>
    <p className="text-gray-700">Your bio goes here...</p>
    <div className=' flex   mt-1 p-1 gap-1 text-gray-500 '>
  <span>{userData?.followers?.length} followers</span>
  <span>{userData?.following?.length} following</span>

    </div>
    {
      user?.id!=userData?.id&& (<>
      {amIFollowing?(<button  onClick={handleFollowerUser} className=' bg-[#1d9bf0]   font-serif  text-white font-semibold text-sm py-2 px-4 rounded-full'>Follow</button>):<button  onClick={handleUnFollowUser} className=' bg-[#1d9bf0]   font-serif  text-white font-semibold text-sm py-2 px-4 rounded-full'>Unfollow</button>}
      </>)   

    }

    
  </div>
</div>



<div className="mt-2">
  <h3 className="text-xl  mb- font-bold ">Posts</h3>
 


 
 
</div>
{userData?.tweets?.map((tweet)=>
  <FeedCard key={tweet?.id}  data ={tweet as Tweet}/>
  )}
</div>
        </div>

      
     

  </Twitterlayout>
    

         
   )

}
async  function GetUser(id :string){
  if (!id) return "notFound"
  const res = await graphqlClient.request(getUserByIdQuery, {id} );
  if (!res?.getUserById) return "notFound";
  return  res;


}
