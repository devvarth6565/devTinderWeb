const Footer = () => {
    return (
        <footer className="bg-[#FFFFF0] border-t mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-primary mb-4">DevTinder</h3>
                        <p className="text-gray-700 mb-4">
                            Connecting developers worldwide. Find your perfect coding partner, 
                            collaborate on projects, and grow together in the tech community.
                        </p>
                        <p className="text-sm text-gray-600">
                            Swipe right on skills, swipe left on bugs. 🚀
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-800">Quick Links</h4>
                        <ul className="space-y-2 text-gray-700">
                            <li><a href="#" className="hover:text-primary transition">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition">How It Works</a></li>
                            <li><a href="#" className="hover:text-primary transition">Success Stories</a></li>
                            <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-800">Support</h4>
                        <ul className="space-y-2 text-gray-700">
                            <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} DevTinder. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-600 hover:text-primary transition">
                            <span className="text-xl">𝕏</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary transition">
                            <span className="text-xl">💼</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary transition">
                            <span className="text-xl">📧</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary transition">
                            <span className="text-xl">🐙</span>  
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;