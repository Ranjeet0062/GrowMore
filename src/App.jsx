import Home from "./pages/Home"
import VerifyEmail from "./componet/form/VerifyEmail"
import Footer from "./componet/Footer"
import Navbar from "./componet/Navbar"
import Signup from "./componet/Signup"
import Signin from "./componet/Signin"
import { Routes, Route } from "react-router-dom"
import ResetPassword from "./componet/ResetPassword"
import UpdatePassword from "./componet/UpdatePassword"
import ContactUS from "./pages/ContactUS"
function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/verify-email" element={<VerifyEmail />}/>
        <Route path="/forget-password" element={<ResetPassword/>} />
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/contact" element={<ContactUS/>}/>
      </Routes>
    </div>
  )
}

export default App
