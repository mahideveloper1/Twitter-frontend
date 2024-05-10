import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetQuery } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";


export const useCreateTweet =()=>{
    const queryClient = useQueryClient();
    const mutation =useMutation({
        mutationFn: async (payload:CreateTweetData)=> 
           await graphqlClient.request(createTweetMutation,{payload}),
        onMutate:()=> toast.loading("Creating Tweet",{id:'1'}),
        onSuccess: async ()=> {
            await queryClient.invalidateQueries({ queryKey: ['all-tweets'] })
            toast.success("Created sucess",{id:'1'})
        }
    })
    return mutation
}

export const useGetAllTweets=()=>{
    const query=useQuery({
        queryKey:['all-tweets'],
        queryFn:()=> graphqlClient.request(getAllTweetQuery)
    })
    return {...query,tweets:query.data?.getAllTweets}
}