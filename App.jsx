import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer  from "./Timer";

function App() {

   let time ="july,31,2024";


  return (
   <div>
    <Timer RemainTime={time}/>
   </div>
  )
  }

  
export default App;

