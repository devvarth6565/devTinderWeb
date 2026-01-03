import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Github, Linkedin, ChevronRight, User } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "@/utils/connectionSlice";

const Connection = () => {
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const connectionData = useSelector((appStore) => appStore.connection);
    const connections = connectionData?.data || [];

    useEffect(() => {
        if (!connectionData) {
            fetchConnections();
        }
    }, []);

    const fetchConnections = async () => {
        try {
            const req = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(req.data));
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    const handleViewProfile = (connection) => {
        setSelectedConnection(connection);
        setIsDialogOpen(true);
    };

    const handleMessage = (e, connection) => {
        e.stopPropagation(); // Prevent opening the profile modal when clicking message
        console.log("Message:", connection.firstName);
    };

    if (!connectionData) return <div className="flex justify-center mt-10">Loading Connections...</div>;

    return (
        <div className="min-h-screen bg-[#FFFEF7] p-6">
            <div className="max-w-4xl mx-auto"> {/* Changed max-width for better list view */}
                <h1 className="text-3xl font-bold mb-6 text-gray-800">My Connections</h1>
                
                {connections.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">No connections yet.</p>
                    </div>
                ) : (
                    // 1. Vertical Stack Layout (Flex Column)
                    <div className="flex flex-col space-y-4"> 
                        {connections.map((connection) => (
                            <div 
                                key={connection._id}
                                onClick={() => handleViewProfile(connection)}
                                className="group flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
                            >
                                {/* Left: Avatar */}
                                <div className="shrink-0 mr-4">
                                    <img 
                                        src={connection.photoUrl || "https://placehold.co/100"} 
                                        alt={connection.firstName}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                        onError={(e) => { e.target.src = "https://placehold.co/100"; }}
                                    />
                                </div>

                                {/* Middle: Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-gray-900 truncate capitalize">
                                            {connection.firstName} {connection.lastName}
                                        </h3>
                                        {connection.age && (
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                {connection.age}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 truncate mt-1">
                                        {connection.bio || "No bio available"}
                                    </p>
                                    
                                    {/* Mini Skills Tags */}
                                    {connection.skills && connection.skills.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {connection.skills.slice(0, 3).map((skill, i) => (
                                                <span key={i} className="text-[10px] px-2 py-0.5 bg-primary/5 text-primary rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Action Buttons */}
                                <div className="flex items-center gap-3 ml-4">
                                    <Button 
                                        size="sm"
                                        variant="outline"
                                        className="hidden sm:flex text-primary hover:text-primary-foreground hover:bg-primary"
                                        onClick={(e) => handleMessage(e, connection)}
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Message
                                    </Button>
                                    
                                    {/* Chevron indicator for "Click to expand" */}
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 2. The "Card" View (Dialog Modal) */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#FFFFF0] max-w-md p-0 overflow-hidden border-0 shadow-2xl">
                    {selectedConnection && (
                        <div>
                            {/* Header Image Background */}
                            <div className="relative h-32 bg-linear-to-r from-primary/20 to-primary/5">
                                <div className="absolute -bottom-10 left-6">
                                    <img 
                                        src={selectedConnection.photoUrl || "https://placehold.co/600"} 
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-[#FFFFF0] object-cover shadow-md"
                                        onError={(e) => { e.target.src = "https://placehold.co/600"; }}
                                    />
                                </div>
                            </div>

                            <div className="pt-12 px-6 pb-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                            {selectedConnection.firstName} {selectedConnection.lastName}
                                        </h2>
                                        <p className="text-sm text-gray-500">{selectedConnection.age ? `${selectedConnection.age} years old` : "Age not specified"}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {selectedConnection.githubUrl && (
                                            <a href={selectedConnection.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {selectedConnection.linkedinUrl && (
                                            <a href={selectedConnection.linkedinUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">About</h4>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {selectedConnection.bio || "This user hasn't written a bio yet."}
                                        </p>
                                    </div>

                                    {selectedConnection.skills && selectedConnection.skills.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedConnection.skills.map((skill, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Button 
                                        className="w-full mt-2" 
                                        onClick={(e) => handleMessage(e, selectedConnection)}
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Send Message
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Connection;