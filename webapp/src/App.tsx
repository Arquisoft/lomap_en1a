
import Navbar from "./components/mainPage/Navbar"
import Home from "./components/mainPage/Home"
import About from "./components/mainPage/About"
import Contact from "./components/mainPage/Contact"
import Footer from "./components/mainPage/Footer"
import { Route, Routes } from "react-router-dom"
import "./App.css";
import LoginForm from "./components/mainPage/LoginForm"
import MapView from "./components/map/MapView"
import { useState } from "react"
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";


function App() {
  const [hidden, setHidden] = useState(false);

  const hide=(b:boolean)=>{
    setHidden(b);
  }
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  return (
    <>
    


    <div className="background-image container">
    <Navbar/>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/map" element={<MapView/>} />
        </Routes>
      
    {!hidden &&<Footer/>}
    
      </div>

    </>
  )
}

export default App

