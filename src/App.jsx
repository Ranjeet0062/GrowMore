import Home from "./pages/Home"
import Footer from "./componet/Footer"
import Navbar from "./componet/Navbar"
import  Signup from "./componet/Signup"
import Signin from "./componet/Signin"
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
