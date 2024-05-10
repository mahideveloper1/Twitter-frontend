"use client"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react'
import { Toaster } from 'react-hot-toast';

const TanStackProvider = ({children}:{children:React.ReactNode}) => {
    const queryClient =new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
            <Toaster />
       <GoogleOAuthProvider clientId="144026281361-8d3v91a9g23edsu2qrm3vhe4cs2vgtss.apps.googleusercontent.com">
       {children}
      </GoogleOAuthProvider>
    
  
   <ReactQueryDevtools />
  </QueryClientProvider>

    
  )
}

export default TanStackProvider
