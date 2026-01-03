import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { toast } from "sonner"; // Assuming you have sonner installed from previous steps

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Login State
    const [email, setEmail] = useState("papa@gmail.com");
    const [password, setPassword] = useState("Papapapa$$1");

    // Forgot Password State
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", { email, password }, { withCredentials: true });
            dispatch(addUser(res.data));
            toast.success("Login Successful");
            return navigate("/profile");
        } catch (error) {
            console.log(error);
            toast.error("Login Failed", { description: error.response?.data || "Invalid credentials" });
        }
    };

    const handleForgotPassword = async () => {
        try {
            // Your API uses PATCH method for /forgetpassword
            const res = await axios.patch(BASE_URL + "/forgetpassword", {
                email: forgotEmail,
                password: newPassword
            });
            
            toast.success("Success", { description: "Password changed successfully" });
            setIsForgotPasswordOpen(false); // Close the modal
        } catch (error) {
            console.error(error);
            toast.error("Failed", { description: error.response?.data || "Something went wrong" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7] p-4">
            <Card className="w-full max-w-md bg-[#FFFFF0] border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Login to your DevTinder account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="developer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white border-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white border-gray-300"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="remember" className="text-gray-600 cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        
                        {/* Modified Forgot Password Link */}
                        <button 
                            type="button"
                            onClick={() => setIsForgotPasswordOpen(true)}
                            className="text-primary hover:underline font-medium"
                        >
                            Forgot password?
                        </button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" onClick={handleLogin}>Login</Button>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            {/* Forgot Password Modal */}
            <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                <DialogContent className="bg-[#FFFFF0]">
                    <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                            Enter your email and a new password to reset your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="reset-email">Email Address</Label>
                            <Input
                                id="reset-email"
                                placeholder="Enter your email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <Button className="w-full mt-2" onClick={handleForgotPassword}>
                            Reset Password
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Login;