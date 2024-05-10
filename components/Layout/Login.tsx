
"use client"

import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { userCurrentUser } from "@/hooks";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import  { useCallback } from "react";
import toast from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import React from 'react'

export const Login = () => {
    const queryClient = useQueryClient();


    const handleLoginWithGoogle =useCallback(async(cred:CredentialResponse)=>{
    
   
        const googleToken = cred.credential
        
        
    
        if(!googleToken) return toast.error("Something went wrong");
    
         const {verifyGoogleToken} = await graphqlClient.request(
          verifyUserGoogleToken,{token:googleToken}
         );
         toast.success("Verified Success");
    
         
         
         if(verifyGoogleToken){
           window.localStorage.setItem('token',verifyGoogleToken);
           queryClient.invalidateQueries({ queryKey: ['current-user'] });
           
          
          }
         
      },[queryClient])
  return (
    <div className=' p-5 bg-black/20 rounded-lg'>
    <h1 className=' my-2 text-2xl font-bold  text-[#0F1419]'>Join Twitter today.</h1>
  <GoogleLogin   onSuccess={handleLoginWithGoogle} />
  </div>
  )
}
