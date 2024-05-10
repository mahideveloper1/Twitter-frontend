
import React,{useState} from 'react'
import Image from 'next/image'
import  { useCallback } from 'react'
import { BiImage} from "react-icons/bi"
import FeedCard from '@/components/FeedCard'
import { userCurrentUser } from '@/hooks'
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweets'
import { Tweet } from '@/gql/graphql'
import Twitterlayout from './Layout/TwitterLayout'
import { graphqlClient } from '@/clients/api'
import { getSignedURLForTweetQuery } from '@/graphql/query/tweet'
import { get } from 'http'
import axios from 'axios'
import toast from 'react-hot-toast'


// "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
const Front:React.FC = () => {
  




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
   
    <Twitterlayout>
        <div className=' fixed  bg-zinc-100  top-0  w-[30.5%]  grid grid-cols-2 '>

<div className='    border-b-2 border-black  pb-2  h-12  hover:bg-twitter-gray  flex items-center justify-center h-13 col-span-1' >
  <span className='   text-sm   font-semibold  '>For you </span>
  </div>
<div className='  h-12 flex items-center justify-center hover:bg-twitter-gray h-13 col-span-1'> 
 <span className='  font-semibold  text-sm'>Following</span>
</div>



</div>
    <div className= ' bg-white  h-12'>
</div>

<div className='border  p-4 pb-0 border-r-0 border-l-0 border-b-0 hover:bg-[#F7F7F7] translate-all cursor-pointer'>

<div className='grid grid-cols-12 gap-3'>
<div className='col-span-1'>
  {user?.profileImageUrl&&(<Image className=' rounded-full ' height={50} width={50}  alt="user-image"src={user?.profileImageUrl } />)}

</div>
<div className='col-span-11  pb-2'>
  <textarea value={content}  onChange={e=> setContent(e.target.value)} placeholder="What is Happening? "className='w-full bg-transparent text-xl px-3 border-b border-slate-700' rows={4}></textarea>
{imageUrl&&<Image src={imageUrl} alt="image" width={300} height={300}/>}


<div className='mt-2 flex justify-between items-center'>
  <BiImage  onClick={handleSelectImage} className='text-xl'/>
  <button  onClick={handleCreateTweet} className=' bg-[#1d9bf0]   font-serif  text-white font-semibold text-sm py-2 px-4 rounded-full'>Tweet</button>

</div>
</div>


</div>
</div>

{tweets?.map(tweet=> tweet? <FeedCard key={tweet?.id}  data ={tweet as Tweet}/>:null)}
</Twitterlayout>
  

    
  )
}

export default Front