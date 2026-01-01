import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";



const SignUp = () => {
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch();
        const Navigate = useNavigate();

        const handleSignUp = async () => {
            const res = await axios.post(BASE_URL+"/signup", {firstName,lastName,email,password},{withCredentials:true})

            dispatch(addUser(res.data))
            return Navigate("/feed")
    
        }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7] p-4">
            <Card className="w-full max-w-md bg-[#FFFFF0] border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Join DevTinder</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Create your account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                            <Input 
                                id="firstName" 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}

                                placeholder="John"
                                className="bg-white border-gray-300"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                            <Input 
                                id="lastName" 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}

                                placeholder="Doe"
                                className="bg-white border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}


                            placeholder="developer@example.com"
                            className="bg-white border-gray-300"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}


                            placeholder="••••••••"
                            className="bg-white border-gray-300"
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            className="rounded border-gray-300 mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                            I agree to the{" "}
                            <a href="#" className="text-primary hover:underline">
                                Terms & Conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary hover:underline">
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" onClick={handleSignUp}>Create Account</Button>
                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary font-semibold hover:underline">
                            Login
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;