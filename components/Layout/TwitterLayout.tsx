import { userCurrentUser } from '@/hooks';
import React,{ useCallback, useMemo} from 'react'
import { BiHash, BiHomeCircle, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import Image from 'next/image'
import {  CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { verifyUserGoogleToken } from '@/graphql/query/user';
import { graphqlClient } from '@/clients/api';
import { useQueryClient,} from '@tanstack/react-query'
import  toast from 'react-hot-toast';
import Link from 'next/link';

interface TwitterlayoutProps{
    children : React.ReactNode;
}
   
interface  TwitterSideBitton
{
  tittle:string,
  icon:React.ReactNode
  link:string
}

const Twitterlayout: React.FC <TwitterlayoutProps>=(props)=>{
    const {user} = userCurrentUser();
    const queryClient = useQueryClient();







 
    const SidebarMenuItems: TwitterSideBitton[]= useMemo(()=>[
      {
      tittle:"Home",
      icon:<BiHomeCircle/>,
      link:'/'
      },
      {
        tittle:"Explore",
        icon:<BiHash/>,
        link:'/'
      },
      
      {
        tittle:"Notifications",
        icon:<BsBell/>,
        link:'/'
      },
      {
        tittle:"Mesaages",
        icon:<BsEnvelope/>,
        link:'/'
      },
      {
        tittle:"Bookmarks",
        icon:<BsBookmark/>,
        link:'/'
      },
      {
        tittle:"Profile",
        icon:<BiUser/>,
        link:`/profile/${user?.id}`
      }
  
    ],[user?.id])



//// function login /////

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






return <div>
      <div >
        <div className='grid grid-cols-12 h-screen w-screen px-56'>

<div className="col-span-3  ml-10 px-2 pt-2">
 <div className='flex  items-center justify-center rounded-full w-fit text-2xl h-fit text-twitter-blue hover:bg-twitter-gray   p-2  cursor-pointer transition-all'>
<BsTwitter  />

</div>
<div className=' mt-4  relative '>
 <ul>
   {SidebarMenuItems.map((items)=>(
 
     <li key={items.tittle} >
      <Link className='flex font-serif  items-center gap-3 hover:bg-twitter-gray rounded-full px-3 py-2 w-fit cursor-pointer mt-2'href={items.link}>
      <span className='text-[1.3em]' >{items.icon}</span>
       <span  className='text-[1.3em]'>{items.tittle}</span>
      </Link>
       
   
     </li>
     
   )
   )
   }
 </ul>
 <div className='mt-8  px-4'>
 <button className=' bg-[#1d9bf0]   py-3 rounded-full  w-full text-white text-lg text-bold'>Tweet</button>
 </div>
</div>
{user&&   
<div className='px-3 py-2 font-serif  hover:bg-twitter-gray absolute  bottom-5  flex gap-2 items-center  rounded-full'>
  {user &&user.profileImageUrl&&(<Image className=' rounded-full ' height={30} width={30}  alt="user-image"src={user?.profileImageUrl }/>)}
  <div>
    <h3 className=' text-xl'>
      {user.firstName} {user?.lastName}
    </h3>
  </div>

</div> 
}
</div>








<div className='   col-span-5  overflow-scroll no-scrollbar border-r-[1px] border-l-[1px] border-twitter-border'>
    {props.children}


 

     

  </div>

 



 <div className='col-span-3 p-5 '>
{!user&&
    <div className=' p-5 bg-[#F7F9F9] rounded-lg'>
     <h1 className=' my-2 text-2xl font-bold  text-[#0F1419]'>Join Twitter today.</h1>
   <GoogleLogin   onSuccess={handleLoginWithGoogle} />
   </div>

}
 </div>

</div>


</div>


</div>
}
export default Twitterlayout;