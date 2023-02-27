
import Navbar from "./components/mainPage/Navbar"
import Home from "./components/mainPage/Home"
import About from "./components/mainPage/About"
import Contact from "./components/mainPage/Contact"
import Footer from "./components/mainPage/Footer"
import { Route, Routes } from "react-router-dom"
import "./App.css";
import LoginForm from "./components/mainPage/LoginForm"

function App() {
  return (
    <>
    
    <div className="background-image container">
    <Navbar />
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      
    <Footer/>
    
      </div>
    

    </>
  )
}

export default App

