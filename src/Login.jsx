import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("papa@gmail.com");
    const [password, setPassword] = useState("Papapapa$$1");


    const handleLogin = async ()=>{
        try{
            const res = await axios.post("http://localhost:3000/login",{email,password},{withCredentials:true})
        }catch(error){
            console.log(error);

        }
    }


  



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
                        <a href="#" className="text-primary hover:underline">
                            Forgot password?
                        </a>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" onClick={handleLogin}>Login</Button>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-primary font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;