import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // <--- Import this
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { removeUser } from "../utils/userSlice";


import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const dispatch = useDispatch();

    const user = useSelector((appStore) => appStore.user);

    const handleLogout = async() => {
        try {

            await axios.post(BASE_URL+"/logout", {}, {
                withCredentials: true, 
            });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {

            dispatch(removeUser());
            navigate("/");
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b bg-[#FFFFF0]">
            <div 
                className="text-2xl font-bold text-primary cursor-pointer" 
                onClick={() => navigate("/")}
            >
                DevTinder 
            </div>
            
            <div className="flex gap-3 items-center">
                {/* 2. Check if user exists (Logged In) */}
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Profile Picture Component */}
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={user.photoUrl} alt={user.firstName} />
                            <AvatarFallback>
                                {user.firstName ? user.firstName[0] : "U"}
                            </AvatarFallback>
                        </Avatar>

                        <span className="font-medium text-gray-700">
                            {user.firstName}
                        </span>

                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>
                ) : (
                    // 3. If user is null (Logged Out)
                    <>
                        <Button variant="outline" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <Button onClick={() => navigate("/signup")}>
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}; 

export default NavBar;