import Body from "./Body";
import NavBar from "./NaveBar"
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return (
 <>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Body/>}>

      <Route path="/login" element={<div>login Page</div>} />


      </Route>
    </Routes>
  </BrowserRouter>


 </>
  )
}