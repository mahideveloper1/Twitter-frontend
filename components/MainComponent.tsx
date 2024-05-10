"use client"
import React from 'react'
import Image from 'next/image'


import {useState} from 'react'
import  { useCallback } from 'react'
import { userCurrentUser } from '@/hooks'
import { useCreateTweet} from '@/hooks/tweets'
import { graphqlClient } from '@/clients/api'
import { getSignedURLForTweetQuery } from '@/graphql/query/tweet'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BiImage } from 'react-icons/bi';
import Feed from './Layout/Feed';
import { Tweet } from '@/gql/graphql';
import { useGetAllTweets } from '@/hooks/tweets';

const MainComponent = () => {
  const {user} = userCurrentUser();
  const {mutateAsync} = useCreateTweet();
  const {tweets=[]} =useGetAllTweets();
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');


  const handleInputChangeFile = useCallback((input:HTMLInputElement)=>{
    return async (event:Event)=>{
      event?.preventDefault();
      
      const file: File |null|undefined = input.files?.item(0);
      console.log(file?.type);
      if(!file) return;
      
      const {getSignedURLForTweet}= await graphqlClient.request(getSignedURLForTweetQuery,{
        imageName:file.name,
        imageType:'png'

      })
      console.log(getSignedURLForTweet);
      if(getSignedURLForTweet){
        toast.loading('Uploading',{id:'2'})
         await axios.put(getSignedURLForTweet,file,{
          headers:{'Content-Type':file.type}
         })
         toast.success('Upload Completed',{id:'2'})
         const url = new URL(getSignedURLForTweet);
         const myFilePath =`${url.origin}${url.pathname}`
         setImageUrl(myFilePath);

      }


    }

  },[])





  const handleSelectImage = useCallback(()=>{
    const input = document.createElement("input");
    input.setAttribute("type","file")
    input.setAttribute("accept","image/*");
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change",handlerFn)
    input.click();

  },[handleInputChangeFile])
  
 

  const handleCreateTweet =useCallback( async()=>{
    await mutateAsync({
      imageUrl,
      content,
     
      
    })
   
      setContent('');
      setImageUrl('');
   
   


  },[content,mutateAsync,imageUrl]);


  return (
    <main className="flex w-[55%]   vs:max-laptop:flex-auto    h-full min-h-screen   flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600  ">
    <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
      Home
    </h1>
    <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
      <div className="w-11 h-11 bg-slate-400 rounded-full flex-none">

      {user?.profileImageUrl&& <Image src={user?.profileImageUrl } alt="image" width={800} height={800}/>}
      </div>
      <form  className="flex flex-col w-full h-full">
      <input value={content}  onChange={e=> setContent(e.target.value)}
        type="text"
        name="tweet"
        className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
        placeholder="What's happening?"
      />
      {imageUrl&&<Image src={imageUrl} alt="image" width={800} height={800}/>}

      <div className="w-full justify-between items-center flex">
        <div></div>
        <div className="w-full max-w-[100px]">


          {/* <button
            type="submit"
            className="rounded-full bg-[#1d9bf0]  px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Tweet
          </button> */}

<div className='mt-2 flex justify-between items-center'>
  <BiImage  onClick={handleSelectImage} className='text-xl'/>
  <button  onClick={handleCreateTweet} className=' bg-[#1d9bf0]   font-serif  text-white font-semibold text-sm py-2 px-4 rounded-full'>Tweet</button>

</div>





 
          <button className="invisible" type="reset"></button>
        </div>
      </div>
    </form>
    </div>
    {tweets?.map(tweet=> tweet? <Feed key={tweet?.id}  data ={tweet as Tweet}/>:null)}





  






  </main>

  
  )
}

export default MainComponent

  