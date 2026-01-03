import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Heart } from "lucide-react";
import { toast } from "sonner"; // <--- 1. Import toast

const UserFeedCard = ({ user }) => {
    // Safety check: if user is null (e.g. end of feed), don't crash
    if (!user) return null;

    const { firstName, lastName, age, photoUrl, bio, skills } = user;

    const handleIgnore = () => {
        // 2. Trigger "Info" or "Error" style toast for Ignore
        toast("Passed", {
            description: `You passed on ${firstName}.`,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo ignore"), 
            },
        });

    };

    const handleInterested = () => {

        toast.success("Interested", {
            description: `You liked ${firstName}!`,
            duration: 3000, // Stays for 3 seconds
        });

    };

    return (
        <Card className="w-full max-w-sm bg-[#FFFFF0] border-gray-200 shadow-xl overflow-hidden">
            {/* Image Section */}
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h2 className="text-3xl font-bold text-white">
                        {firstName} {lastName}, {age}
                    </h2>
                </div>
            </div>

            {/* Card Content */}
            <CardContent className="p-6 space-y-4">
                {/* Bio */}
                {bio && (
                    <div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {bio}
                        </p>
                    </div>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
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

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        size="lg"
                        className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={handleIgnore}
                    >
                        <X className="mr-2 h-5 w-5" />
                        Ignore
                    </Button>
                    <Button 
                        size="lg"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={handleInterested}
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