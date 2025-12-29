
import { Button } from "@/components/ui/button";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">
            <div className="text-2xl font-bold text-primary">
                DevTinder
            </div>
            <div className="flex gap-3">
                <Button variant="outline">Login</Button>
                <Button>Sign Up</Button>
            </div>
        </nav>
    );
}; 


export default NavBar;

