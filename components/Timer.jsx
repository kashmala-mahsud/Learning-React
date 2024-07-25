import React,{useEffect, useState} from 'react'

function Timer({RemainTime}) {
    let [Days, SetDays]=useState(0);
    let [Hours, SetHours]=useState(0);
    let [Minutes, SetMinutes]=useState(0);
    let [Seconds, SetSeconds]=useState(0);

    function setTime() {
      
        let time= new Date(RemainTime) -  new Date();
        
        
        SetDays(Math.floor(time / ( 1000 * 60* 60 *24 )));
        SetHours(Math.floor(time / (1000 * 60 * 60) % 24));
        SetMinutes(Math.floor((time / 1000 / 60 ) % 60));
        SetSeconds(Math.floor((time / 1000 ) %60 ));
      
    }
    useEffect(()=>{
       let Interval= setInterval(()=>{
            setTime(RemainTime)
        },1000)
        return () => clearInterval(Interval);
    },[]);
 
    
    
   
  return (
    <div>
      <div className="container">
        <div className="row">
            <div>
            <div className="col-3">
                <h1>{Days < 10 ? "0"+Days : Days}</h1>
                <span>Days</span>
            </div></div>
            <div>
            <div className="col-3">
                <h1>{Hours < 10 ? "0"+Hours : Hours}</h1>
                <span>Hours</span>
            </div></div>

            <div>
            <div className="col-3">
                <h1>{Minutes < 10 ? "0"+Minutes : Minutes}</h1>
                <span>Minutes</span>
            </div>
            </div>
            <div>
            <div className="col-3">
                <h1>{Seconds < 10 ? "0"+Seconds : Seconds}</h1>
                <span>Seconds</span>
            </div></div>
        </div>
      </div>
    </div>
  )
}

export default Timer;
