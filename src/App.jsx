import Body from "./component/Body";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { Provider } from "react-redux";
import Feed from "./component/Feed";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import  appStore  from "./utils/appStore";

export default function App() {
  return (
 <>
 <Provider store={appStore}>
  <BrowserRouter basename="/">
    <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/feed" element={<Feed/>} />
     

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />

    
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>

 </>
  )
}