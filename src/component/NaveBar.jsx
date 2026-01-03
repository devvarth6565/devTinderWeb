import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { MessageSquareText, Users } from "lucide-react"; // 1. Import Icons

const NavBar = () => {
    const navigate = useNavigate();
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
        <nav className="flex items-center justify-between px-6 py-3 border-b bg-[#FFFFF0] shadow-sm">
            {/* Logo */}
            <div 
                className="text-2xl font-bold text-primary cursor-pointer tracking-tighter hover:scale-105 transition-transform" 
                onClick={() => navigate("/feed")}
            >
                DevTinder 
            </div>
            
            <div className="flex gap-3 items-center">
                {user ? (
                    <div className="flex items-center gap-6">
                        
                        {/* 2. New Navigation Links (Beautiful & Subtle) */}
                        <div className="flex gap-2 mr-2">
                            <Button 
                                variant="ghost" 
                                className="text-gray-600 hover:text-primary hover:bg-primary/10 transition-all"
                                onClick={() => navigate("/connections")}
                            >
                                <Users className="w-5 h-5 mr-2" />
                                <span className="hidden md:inline">Connections</span>
                            </Button>

                            <Button 
                                variant="ghost" 
                                className="text-gray-600 hover:text-primary hover:bg-primary/10 transition-all"
                                onClick={() => navigate("/requests")}
                            >
                                <MessageSquareText className="w-5 h-5 mr-2" />
                                <span className="hidden md:inline">Requests</span>
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-[1px] bg-gray-300 hidden md:block"></div>

                        {/* Profile Section */}
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-700 hidden sm:block">
                                {user.firstName}
                            </span>
                            
                            <Avatar 
                                className="cursor-pointer border-2 border-transparent hover:border-primary transition-all w-10 h-10" 
                                onClick={() => navigate("/profile")}
                            >
                                <AvatarImage src={user.photoUrl} alt={user.firstName} className="object-cover"/>
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {user.firstName ? user.firstName[0] : "U"}
                                </AvatarFallback>
                            </Avatar>

                            <Button 
                                onClick={handleLogout} 
                                variant="destructive" 
                                size="sm" 
                                className="ml-2"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Button variant="ghost" onClick={() => navigate("/login")} className="text-gray-700">
                            Login
                        </Button>
                        <Button onClick={() => navigate("/signup")}>
                            Create Account
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}; 

export default NavBar;