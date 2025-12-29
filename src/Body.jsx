import { Outlet } from "react-router";
import NavBar from "./NaveBar"
import Footer from "./Footer";

const Body = ()=>{
    return(<>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Body;