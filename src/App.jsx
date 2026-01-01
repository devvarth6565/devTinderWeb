import Body from "./Body";
import Login from "./Login";
import SignUp from "./SignUp";

import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return (
 <>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Body/>}>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />



      </Route>
    </Routes>
  </BrowserRouter>


 </>
  )
}