
import LoggedNavbar from "./components/mainPage/LoggedNavbar"
import NotLoggedNavbar from "./components/mainPage/NotLoggedNavbar"
import Home from "./components/mainPage/Home"
import About from "./components/mainPage/About"
import Contact from "./components/mainPage/Contact"
import Footer from "./components/mainPage/Footer"
import { Route, Routes } from "react-router-dom"
import "./App.css";
import LoginForm from "./components/mainPage/LoginForm"
import MapView from "./components/map/MapView"
import { useState } from "react"
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { session } = useSession();

  const nav = useNavigate();

  session.onLogin(()=>{
    setIsLoggedIn(true)
    nav("/map")
  })
  
  session.onLogout(()=>{
    setIsLoggedIn(false)
    nav("/")
  })


  
  return (
    
    <div className="background-image container">
      {isLoggedIn ? <LoggedNavbar/> : <NotLoggedNavbar/>}
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/map" element={<MapView/>} />
          </Routes>
        
      <Footer/>
    
    </div>

    
  )
}

export default App

