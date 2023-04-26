import NavBar from "./components/mainPage/NavBar"
import React from 'react';
import Home from "./components/mainPage/Home"
import About from "./components/mainPage/About"
import Contact from "./components/mainPage/Contact"
import Footer from "./components/mainPage/Footer"
import {Navigate, Route, Routes} from "react-router-dom"
import "./App.css";
import LoginForm from "./components/mainPage/LoginForm"
import MapView from "./components/map/MapView"
import UserProfile from "./components/mainPage/UserProfile"
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useCookies } from "react-cookie";




type PrivateProps={
    children:any
}

function PrivateComponent(props:PrivateProps):JSX.Element{
    const [cookies, setCookie] = useCookies();

    if(cookies.isLogged==="true"){
        return props.children;
    }
    return <Navigate to= "/login"/>;
}

function App() {
  
    return (

        <div className="background-image container">
    
            <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/login/fail" element={<LoginForm fail={true}/>}/>
                    <Route path="/map" element={<PrivateComponent children = {<MapView/>}/>}/>
                    <Route path="/profile" element={<PrivateComponent children = {<UserProfile/>}/>}/>
                    <Route path="*" element={<Navigate to= "/"/>}/>
                </Routes>

            <Footer/>
    

        


        </div>


    )
}

export default App

