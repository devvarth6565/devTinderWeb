import { useNavigate, Outlet } from "react-router";
import NavBar from "./NaveBar"
import Footer from "./Footer";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "@/utils/userSlice";
import axios from "axios";
import appStore from "@/utils/appStore";


const Body = ()=>{
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((appStore)=>appStore.user)
    const fetchUser = async()=>{
        if(userData) return;
        try{
           
            const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
            dispatch(addUser(res.data))



        }catch(err){{
           
            if (err.response && err.response.status === 401) {
                console.log("Token invalid or missing. Redirecting to Login...");
                navigate("/login");
            } else {

                console.error("API Error:", err);
            }}
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])


    return(
    
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Body;