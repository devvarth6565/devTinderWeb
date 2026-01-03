import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { X } from "lucide-react";


const ProfileEdit = ({user}) => {
    const dispatch = useDispatch();




    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio || "Full-stack developer passionate about creating amazing web experiences.",
        photoUrl: user.photoUrl,
        githubUrl: user.githubUrl || "https://github.com/johndoe",
        linkedinUrl: user.linkedinUrl || "https://linkedin.com/in/johndoe",
        gender: user.gender ,
        skills: user.skills || ["React", "Next.js", "Node.js"]
    });

    const [currentSkill, setCurrentSkill] = useState("");
    const availableSkills = ["React", "Next.js", "Node.js", "TypeScript", "JavaScript", "MongoDB", "Express", "Tailwind CSS", "Python", "Java"];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const addSkill = (skill) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
            setCurrentSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData({ 
            ...formData, 
            skills: formData.skills.filter(skill => skill !== skillToRemove) 
        });
    };

 

    const saveProfileChanges = async () => { 
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit",{
                firstName:formData.firstName,
                lastName:formData.lastName,
                bio:formData.bio,
                photoUrl:formData.photoUrl,
                githubUrl:formData.githubUrl,
                linkedinUrl:formData.linkedinUrl,
                gender:formData.gender,
                skills:formData.skills
            },{withCredentials:true}


)
dispatch(addUser(res.data));
toast.success("Profile Updated Successfully", {
    description: "Your changes have been Saved.",
    duration: 4000, // Stays for 4 seconds
    className: "bg-green-50 border-green-200", //
});


        }catch(err){
            console.log(err);
            toast.error("Update Failed", {
                description: err.response?.data || "Something went wrong while saving.",
            });
        }

    }

    return (
        <div className="min-h-screen bg-[#FFFEF7] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Edit Profile</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[#FFFFF0] border-gray-200 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                                        <Input 
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            className="bg-white border-gray-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                                        <Input 
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            className="bg-white border-gray-300"
                                        />
                                    </div>
                                </div>

                               

                                {/* Gender */}
                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="text-gray-700">Gender</Label>
                                    <Select 
                                        value={formData.gender||""}
                                        onValueChange={(value) => handleInputChange("gender", value)}
                                    >
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
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange("bio", e.target.value)}
                                        className="bg-white border-gray-300 min-h-[120px]"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                {/* Photo URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="photoUrl" className="text-gray-700">Profile Photo URL</Label>
                                    <Input 
                                        id="photoUrl"
                                        type="url"
                                        value={formData.photoUrl}
                                        onChange={(e) => handleInputChange("photoUrl", e.target.value)}
                                        className="bg-white border-gray-300"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>

                                {/* GitHub URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="githubUrl" className="text-gray-700">GitHub URL</Label>
                                    <Input 
                                        id="githubUrl"
                                        type="url"
                                        value={formData.githubUrl}
                                        onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                                        className="bg-white border-gray-300"
                                        placeholder="https://github.com/username"
                                    />
                                </div>

                                {/* LinkedIn URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="linkedinUrl" className="text-gray-700">LinkedIn URL</Label>
                                    <Input 
                                        id="linkedinUrl"
                                        type="url"
                                        value={formData.linkedinUrl}
                                        onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                                        className="bg-white border-gray-300"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>

                                {/* Skills */}
                                <div className="space-y-2">
                                    <Label htmlFor="skills" className="text-gray-700">Skills</Label>
                                    <div className="flex gap-2">
                                        <Select 
                                            value={currentSkill}
                                            onValueChange={setCurrentSkill}
                                        >
                                            <SelectTrigger className="bg-white border-gray-300">
                                                <SelectValue placeholder="Select a skill" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#FFFFF0]">
                                                {availableSkills.map((skill) => (
                                                    <SelectItem key={skill} value={skill}>
                                                        {skill}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button 
                                            type="button"
                                            onClick={() => addSkill(currentSkill)}
                                            disabled={!currentSkill}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    
                                    {/* Selected Skills */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.skills.map((skill) => (
                                            <span 
                                                key={skill}
                                                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium flex items-center gap-2"
                                            >
                                                {skill}
                                                <X 
                                                    className="h-4 w-4 cursor-pointer hover:text-red-500" 
                                                    onClick={() => removeSkill(skill)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <Button 
                                        variant="outline" 
                                        className="flex-1"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        className="flex-1"
                                        onClick={saveProfileChanges}
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Profile Preview */}
                    <div className="lg:col-span-1">
                        <Card className="bg-[#FFFFF0] border-gray-200 shadow-lg sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-xl">Profile Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Profile Image */}
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200">
                                    <img 
                                        src={formData.photoUrl} 
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/400";
                                        }}
                                    />
                                </div>

                                {/* Profile Info */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {formData.firstName} {formData.lastName}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {formData.email}
                                    </p>
                                </div>

                                {/* Bio Preview */}
                                {formData.bio && (
                                    <div className="pt-2">
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {formData.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Skills Preview */}
                                {formData.skills.length > 0 && (
                                    <div className="pt-2">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skills.map((skill) => (
                                                <span 
                                                    key={skill}
                                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;