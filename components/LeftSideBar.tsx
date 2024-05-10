
import React from 'react'
import Link from 'next/link';
import { useMemo} from 'react'
import { BiHash, BiHomeCircle, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsThreeDots, BsTwitter } from 'react-icons/bs';
import Image from 'next/image'
import Profile from './Layout/Profile';


interface TwitterlayoutProps{
    children : React.ReactNode;
}
   
interface  TwitterSideBitton
{
  tittle:string,
  icon:React.ReactNode
  link:string
}









 
    const SidebarMenuItems: TwitterSideBitton[]= [
      
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
        link:`/`
      }
  
    ]


const LeftSideBar = () => {
  return (
    

    <section className="w-[23%] vs:max-laptop:w-[10%] sticky top-0 xl:flex flex-col items-stretch h-screen  ">
    <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
<div className='hover:bg-twitter-gray  text-2xl transition duration-200 flex items-center justify-start  rounded-3xl w-fit h-fit  py-2 px-6 vs:max-laptop:px-2'>
    <BsTwitter  />
   

    </div>
  
  {SidebarMenuItems.map((item) => (
    <Link
      className="hover:bg-twitter-gray text-2xl transition duration-200 flex items-center justify-start w-fit h-fit space-x-4 rounded-3xl py-2 px-6  vs:max-laptop:px-2"
      href={item.link}
      key={item.tittle}
    >
      <div >
      {item.icon}
      </div>
      {item.tittle !== "Twitter" && <div  className='vs:max-laptop:hidden '>{item.tittle}</div>}
    </Link>
  ))}
  
   <button className=" vs:max-laptop:hidden  rounded-full m-4 bg-[#1d9bf0] p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
          Tweet
   </button>
</div>
<Profile/>
</section>
  )
}

export default LeftSideBar
//         <Twitterlayout>
          
//           <div>
//               <div>
//           <nav className=" flex items-center gap-3 p-3">
//             <BsArrowLeftShort className="text-4xl"/>
//             <div>
//               <h1  className="text-2xl font-bold">{userData?.firstName}</h1>
//               <h1 className=" text-xs  text-gray-500 ">{userData?.tweets?.length} Tweets</h1>
//             </div>


//           </nav>
//         </div>


// <div className="container mx-auto p-4">
// <div className="flex">
//   <div className="mr-4">
    
//     <img
//       className="w-20 h-20 rounded-full"
//       src={userData?.profileImageUrl  ?? "https://placekitten.com/200/200"} 
//       alt="Profile"
//     />
//   </div>
//   <div>
//     <h2 className="font-bold text-xl">{userData?.firstName}</h2>
//     <p className="text-gray-500">@{userData?.id}</p>
//     <p className="text-gray-700">Your bio goes here...</p>
//     <div className=' flex   mt-1 p-1 gap-1 text-gray-500 '>
//   <span>{userData?.followers?.length} followers</span>
//   <span>{userData?.following?.length} following</span>

//     </div>
//     {
//       user?.id!=userData?.id&& (<>
//       {amIFollowing?(<button  onClick={handleFollowerUser} className=' bg-[#1d9bf0]   font-serif  text-white font-semibold text-sm py-2 px-4 rounded-full'>Follow</button>):<button  onClick={handleUnFollowUser} className=' bg-[#1d9bf0]   font-serif  text-white font-semibold text-sm py-2 px-4 rounded-full'>Unfollow</button>}
//       </>)   

//     }

    
//   </div>
// </div>



// <div className="mt-2">
//   <h3 className="text-xl  mb- font-bold ">Posts</h3>
 


 
 
// </div>
// {userData?.tweets?.map((tweet)=>
//   <FeedCard key={tweet?.id}  data ={tweet as Tweet}/>
//   )}
// </div>
//         </div>

      
     

//   </Twitterlayout>