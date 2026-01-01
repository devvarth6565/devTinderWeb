import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

    const handleLogout = () => {
       
        setIsLoggedIn(true);
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">
            <div 
                className="text-2xl font-bold text-primary cursor-pointer" 
                onClick={() => navigate("/")}
            >
                DevTinder
            </div>
            <div className="flex gap-3">
                {isLoggedIn ? (
                    <Button onClick={handleLogout}>Logout</Button>
                ) : (
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

