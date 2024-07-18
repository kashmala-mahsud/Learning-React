import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import GoogleMeet from "./components/GoogleMeet";


function App() {
  return (
    <div className="cardsbody" >
    <GoogleMeet name='Ali' img='https://images.pexels.com/photos/10147934/pexels-photo-10147934.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' />
    <GoogleMeet name='Farwa' img="" />
    <GoogleMeet name='Laiba' img=""/>
    <GoogleMeet name='Saima' img=""/>
    <GoogleMeet name='Ayesha' img=""/>

   
    </div>
  );
}

export default App;
