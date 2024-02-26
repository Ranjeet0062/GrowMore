import "./App.css";
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
import Dashbord from "./componet/dashbord/Dashbord"
import Myprofile from "./componet/Myprofile"
import Enrolledcourse from "./componet/Enrolledcourse"
import SettingPage from "./componet/Setting/SettingPage"
import MyCourse from "./componet/dashbord/MyCourse"
import AddCourse from "./componet/dashbord/AddCourse"
import EditCourse from "./componet/dashbord/EditeCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails"
import Cart from "./componet/dashbord/Cart"
import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./componet/dashbord/ViewCourse/VideoDetails"
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="dashboard/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ResetPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route element={<Dashbord />}>
          <Route path="/dashboard/my-profile" element={<Myprofile />} />
          <Route path="/dashboard/enrolled-courses" element={<Enrolledcourse />} />
          <Route path="/dashboard/settings" element={<SettingPage />} />
          <Route path="/dashboard/my-courses" element={<MyCourse />} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
        </Route>
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route element={
            <ViewCourse />
        }>
          <Route
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
