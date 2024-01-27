import Home from "./pages/Home"
import Footer from "./componet/Footer"
import Navbar from "./componet/Navbar"
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
