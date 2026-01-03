import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Github, Linkedin } from "lucide-react";
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

    const handleMessage = (connection) => {
        console.log("Message:", connection.firstName);
    };

    if (!connectionData) return <div className="flex justify-center mt-10">Loading Connections...</div>;

    return (
        <div className="min-h-screen bg-[#FFFEF7] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">My Connections</h1>
                
                {connections.length === 0 ? (
                    <Card className="bg-[#FFFFF0] border-gray-200 shadow-lg">
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-600 text-lg">No connections yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 4. Map over the 'connections' variable we defined above */}
                        {connections.map((connection) => (
                            <Card 
                                key={connection._id} 
                                className="bg-[#FFFFF0] border-gray-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => handleViewProfile(connection)}
                            >
                                <CardContent className="p-0">
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            // 5. Updated fallback to placehold.co to avoid errors
                                            src={connection.photoUrl || "https://placehold.co/400"} 
                                            alt={`${connection.firstName}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/400";
                                            }}
                                        />
                                    </div>

                                    <div className="p-4 space-y-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 capitalize">
                                                {connection.firstName} {connection.lastName}
                                            </h3>
                                            {connection.age && <p className="text-sm text-gray-600">{connection.age} years old</p>}
                                        </div>

                                        {connection.bio && (
                                            <p className="text-sm text-gray-700 line-clamp-2">
                                                {connection.bio}
                                            </p>
                                        )}

                                        <Button 
                                            className="w-full mt-3"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMessage(connection);
                                            }}
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Message
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#FFFFF0] max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedConnection && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl capitalize">
                                    {selectedConnection.firstName} {selectedConnection.lastName}
                                </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6 mt-4">
                                <div className="relative w-full h-80 rounded-lg overflow-hidden">
                                    <img 
                                        src={selectedConnection.photoUrl || "https://placehold.co/600"} 
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* ... (Rest of your Dialog code is fine) ... */}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Connection;