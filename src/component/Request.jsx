import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, X, User } from "lucide-react";
import { toast } from "sonner"; 
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "@/utils/requestSlice"; // Import removeRequest

const Request = () => {
    // 1. We no longer need local state for 'requests'
    // const [requests, setRequests] = useState([]); <--- REMOVED

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const dispatch = useDispatch();
    
    // 2. Read data strictly from Redux Store
    const requests = useSelector((store) => store.request);

    // 3. Fix Conditional Hook: Hooks must be top-level. Move the 'if' inside.
    useEffect(() => {
        if (!requests) {
            fetchRequests();
        }
    }, []); 

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", { 
                withCredentials: true 
            });
            // Dispatch to Redux instead of setting local state
            dispatch(addRequest(res.data.data)); // Assuming API returns { data: [...] }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleViewProfile = (request) => {
        setSelectedRequest(request);
        setIsDialogOpen(true);
    };

    const handleAccept = async (requestId, status, e) => {
        if(e) e.stopPropagation(); // Safe check if e exists
        try {
            await axios.post(
                `${BASE_URL}/request/review/${status}/${requestId}`, 
                {}, 
                { withCredentials: true }
            );
            
            // 4. Update Redux Store: Remove the item from the global state
            dispatch(removeRequest(requestId));
            
            // Show Success Toast
            if (status === "accepted") {
                toast.success("Connection Accepted", {
                    description: "You are now connected!",
                    className: "bg-green-50 text-green-800 border-green-200"
                });
            } else {
                toast.info("Request Rejected", {
                    description: "The request has been removed."
                });
            }

        } catch (error) {
            console.error("Error updating request:", error);
            toast.error("Action Failed", {
                description: error.response?.data || "Something went wrong."
            });
        }
    };

    // Handle the initial loading state (when Redux is null)
    if (!requests) return <div className="flex justify-center mt-10">No requests yet.</div>;

    return (
        <div className="min-h-screen bg-[#FFFEF7] p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Connection Requests</h1>
                    <p className="text-gray-600">
                        {requests.length} {requests.length === 1 ? 'person is' : 'people are'} interested in connecting with you
                    </p>
                </div>

                {requests.length === 0 ? (
                    <Card className="bg-[#FFFFF0] border-gray-200 shadow-lg">
                        <CardContent className="p-12 text-center">
                            <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 text-lg">No pending requests</p>
                            <p className="text-gray-500 text-sm mt-2">
                                Keep swiping to find more connections!
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {requests.map((request) => {
                            const user = request.fromUserId;
                            if (!user) return null; 

                            return (
                                <Card 
                                    key={request._id}
                                    className="bg-[#FFFFF0] border-gray-200 shadow-md hover:shadow-lg transition-all cursor-pointer"
                                    onClick={() => handleViewProfile(request)}
                                >
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row gap-4 p-6">
                                            {/* Profile Picture */}
                                            <div className="shrink-0">
                                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                                                    <img 
                                                        src={user.photoUrl || "https://placehold.co/400"} 
                                                        alt={`${user.firstName}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.src = "https://placehold.co/400"; }}
                                                    />
                                                </div>
                                            </div>

                                            {/* User Info */}
                                            <div className="grow space-y-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800 capitalize">
                                                        {user.firstName} {user.lastName}
                                                    </h3>
                                                    {user.age && <p className="text-sm text-gray-600">{user.age} years old</p>}
                                                </div>

                                                {user.bio && (
                                                    <p className="text-gray-700 text-sm line-clamp-2">
                                                        {user.bio}
                                                    </p>
                                                )}

                                                {/* Skills */}
                                                {user.skills && user.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        {user.skills.slice(0, 4).map((skill, index) => (
                                                            <span 
                                                                key={index}
                                                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {user.skills.length > 4 && (
                                                            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                                                                +{user.skills.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex md:flex-col gap-3 md:justify-center min-w-30">
                                                <Button
                                                    size="sm"
                                                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white"
                                                    onClick={(e) => handleAccept(request._id, "accepted", e)}
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 md:flex-none border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                                    onClick={(e) => handleAccept(request._id, "rejected", e)}
                                                >
                                                    <X className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Profile Detail Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#FFFFF0] max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedRequest && selectedRequest.fromUserId && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl capitalize">
                                    {selectedRequest.fromUserId.firstName} {selectedRequest.fromUserId.lastName}
                                </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6 mt-4">
                                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100">
                                    <img 
                                        src={selectedRequest.fromUserId.photoUrl || "https://placehold.co/600"} 
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = "https://placehold.co/600"; }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold capitalize">
                                            {selectedRequest.fromUserId.firstName} {selectedRequest.fromUserId.lastName}
                                        </h3>
                                        <span className="text-gray-600">{selectedRequest.fromUserId.age ? `${selectedRequest.fromUserId.age} years old` : ""}</span>
                                    </div>
                                    {selectedRequest.fromUserId.gender && <p className="text-gray-600 capitalize">{selectedRequest.fromUserId.gender}</p>}
                                </div>

                                {selectedRequest.fromUserId.bio && (
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-800">About</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            {selectedRequest.fromUserId.bio}
                                        </p>
                                    </div>
                                )}

                                {selectedRequest.fromUserId.skills && selectedRequest.fromUserId.skills.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-800">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedRequest.fromUserId.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                        onClick={(e) => {
                                            handleAccept(selectedRequest._id, "accepted", e);
                                            setIsDialogOpen(false);
                                        }}
                                    >
                                        <Check className="mr-2 h-5 w-5" />
                                        Accept Request
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-red-200 text-red-500 hover:bg-red-50"
                                        onClick={(e) => {
                                            handleAccept(selectedRequest._id, "rejected", e);
                                            setIsDialogOpen(false);
                                        }}
                                    >
                                        <X className="mr-2 h-5 w-5" />
                                        Reject Request
                                    </Button>
                                </div>
                            </div>
                        </> 
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Request;