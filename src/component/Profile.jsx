import { use } from "react";
import ProfileEdit from "./ProfileEdit";
import { useSelector } from "react-redux";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addUser } from "@/utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";



const Profile = ()=>{
    const user = useSelector((appStore)=>appStore.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const fetchProfile = async () => {
        
        try {

          const res = await axios.get(BASE_URL+"/profile/view", { 
            withCredentials: true 
          });

          dispatch(addUser(res.data)); 
        } catch (err) {
          console.error("User not logged in or session expired");
          navigate("/login");

        }
      };
    
      useEffect(() => {

        fetchProfile();
      }, []);

    
    if (!user) {
        return <div className="flex justify-center mt-10">Loading profile...</div>; 
    }
    return(
        <>
        <ProfileEdit user={user}/>
        </>
    )
}

export default Profile;