import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addFeed } from "@/utils/feedSlice";
import UserFeedCard from "./userFeedCard";




const Feed =  ()=>{
    const feed = useSelector((appStore)=>appStore.feed)
    const dispatch = useDispatch();

   const getFeed = async()=>{ 
    if(feed) return;
    try{
    const res =await axios.get(BASE_URL+"/feed",{withCredentials:true})
    dispatch(addFeed(res.data.data))
    }catch(err){
        console.log(err);
    }

}
    useEffect(()=>{
        getFeed();
    },[])
 
    if (!feed) return; 
    if (feed.length <= 0) return <h1 className="flex justify-center my-10">No new users found!</h1>;


    return(
        <><div className="flex justify-center my-10">

        <UserFeedCard user={feed[0]} />
    </div>
        </>
    )
}

export default Feed;