import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { X, Heart } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux"; // 1. Import useDispatch
import { removeUserFromFeed } from "@/utils/feedSlice"; // 2. Import the action

const UserFeedCard = ({ user }) => {
    const dispatch = useDispatch(); 

    if (!user) return null;

    const { firstName, lastName, age, photoUrl, bio, skills } = user;

    const handleIgnore = async (status) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + user._id, {}, { withCredentials: true });
            
            // 4. Remove user from Redux store immediately
            dispatch(removeUserFromFeed(user._id)); 

            toast("Passed", {
                description: `You passed on ${firstName}.`,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleInterested = async (status) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + user._id, {}, { withCredentials: true });

            // 4. Remove user from Redux store immediately
            dispatch(removeUserFromFeed(user._id));

            toast.success("Interested", {
                description: `You liked ${firstName}!`,
                duration: 3000,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className="w-full max-w-sm bg-[#FFFFF0] border-gray-200 shadow-xl overflow-hidden">
            <div className="relative h-80 overflow-hidden">
                <img
                    src={photoUrl || "https://placehold.co/600x400"}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400?text=User";
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
                    <h2 className="text-3xl font-bold text-white">
                        {firstName} {lastName}, {age}
                    </h2>
                </div>
            </div>

            <CardContent className="p-6 space-y-4">
                {bio && <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>}
                
                {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleIgnore("ignored")}
                    >
                        <X className="mr-2 h-5 w-5" />
                        Ignore
                    </Button>
                    <Button
                        size="lg"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleInterested("intrested")}
                    >
                        <Heart className="mr-2 h-5 w-5" />
                        Interested
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserFeedCard;