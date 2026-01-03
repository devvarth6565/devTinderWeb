import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "@/utils/feedSlice";
import UserFeedCard from "./userFeedCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX, RefreshCcw } from "lucide-react"; // Import nice icons
import { useNavigate } from "react-router-dom"; // Use router for navigation if needed

const Feed = () => {
    const feed = useSelector((appStore) => appStore.feed);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleRefresh = () => {
        // Simple refresh logic: clear feed in redux (optional) or just reload page
        window.location.reload();
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return <div className="flex justify-center mt-20 text-gray-500">Loading feed...</div>;

    // --- BEAUTIFIED EMPTY STATE ---
    if (feed.length <= 0) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] p-4">
                <Card className="bg-[#FFFFF0] max-w-md w-full text-center border-gray-200 shadow-lg p-8">
                    <CardContent className="flex flex-col items-center space-y-6 pt-6">
                        <div className="bg-orange-100 p-6 rounded-full">
                            <SearchX className="h-16 w-16 text-orange-500" />
                        </div>
                        
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-800">No New Matches</h2>
                            <p className="text-gray-600">
                                You've explored all the profiles for now. Check back later for more developers!
                            </p>
                        </div>

                        <div className="flex gap-4 w-full">
                            <Button 
                                variant="outline" 
                                className="flex-1 border-gray-300"
                                onClick={() => navigate("/profile")}
                            >
                                Edit Profile
                            </Button>
                            <Button 
                                className="flex-1 bg-primary text-white hover:bg-primary/90"
                                onClick={handleRefresh}
                            >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Refresh
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // --- NORMAL FEED STATE ---
    return (
        <div className="flex justify-center my-10 px-4">
            <UserFeedCard user={feed[0]} />
        </div>
    );
};

export default Feed;