import NavBar from "./components/mainPage/NavBar"
import React, {useEffect, useState} from 'react';
import Home from "./components/mainPage/Home"
import About from "./components/mainPage/About"
import Contact from "./components/mainPage/Contact"
import Footer from "./components/mainPage/Footer"
import {Route, Routes} from "react-router-dom"
import "./App.css";
import LoginForm from "./components/mainPage/LoginForm"
import MapView from "./components/map/MapView"
import UserProfile from "./components/mainPage/UserProfile"
import "react-sliding-pane/dist/react-sliding-pane.css";


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (

        <div className="background-image container">
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/map" element={<MapView/>}/>
                <Route path="/profile" element={<UserProfile/>}/>
            </Routes>


            <Footer/>

        </div>


    )
}

export default App

