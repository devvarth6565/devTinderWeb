import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";

const EditProfile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");

    const handleSignUp = async () => {
        const res = await axios.post("http://localhost:3000/signup", {username,email,password,gender,photoUrl,bio,linkedin,github},{withCredentials:true})

    }

    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7] p-4 py-12">
            <Card className="w-full max-w-2xl bg-[#FFFFF0] border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Join DevTinder</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Create your account and start connecting with developers
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-gray-700">Username</Label>
                            <Input 
                                id="username" 
                                type="text" 
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                               
                                className="bg-white border-gray-300"
                            />
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
                    </div>

                    {/* Password */}
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

                    {/* Photo URL */}
                    <div className="space-y-2">
                        <Label htmlFor="photoUrl" className="text-gray-700">Profile Photo URL</Label>
                        <Input 
                            id="photoUrl" 
                            type="url"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            
                            placeholder="https://example.com/photo.jpg"
                            className="bg-white border-gray-300"
                        />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <Label htmlFor="gender" className="text-gray-700">Gender</Label>
                        <Select value={gender} 
                         onValueChange={(value) => setGender(value)}>
                            <SelectTrigger className="bg-white border-gray-300">
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#FFFFF0]">
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                        <Textarea 
                            id="bio" 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            
                            placeholder="Tell us about yourself and your coding journey..."
                            className="bg-white border-gray-300 min-h-[100px]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* LinkedIn URL */}
                        <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-gray-700">
                                LinkedIn URL
                            </Label>
                            <Input 
                                id="linkedin" 
                                type="url" 
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                               
                                placeholder="https://linkedin.com/in/username"
                                className="bg-white border-gray-300"
                            />
                        </div>

                        {/* GitHub URL */}
                        <div className="space-y-2">
                            <Label htmlFor="github" className="text-gray-700">
                                GitHub URL
                            </Label>
                            <Input 
                                id="github" 
                                type="url" 
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                               
                                placeholder="https://github.com/username"
                                className="bg-white border-gray-300"
                            />
                        </div>
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
                        <a href="" className="text-primary font-semibold hover:underline">
                            Login
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default EditProfile;