import React from 'react'




function GoogleMeet(props) {
 

 function ValuesAdd(){
  if (props.img==="") {
  return props.name[0];
  
  }
  else{
    console.log(props.img);
  return <img src={props.img} style={{borderRadius:"50px"}}></img>
  }
 }
    
  return (
    <div className='cards'>

      <div className="card" style={{width: "18rem"}}>
      

      
  <div className="card-body" >
    <div className="box" style={{height:"100px", width:"100px", borderRadius:"50px", backgroundColor:"pink", fontSize:"35px", fontWeight:"800" ,padding:"20px, 0 ,50px,0"}}>{ValuesAdd()}</div>
    <h5 className="card-name" style={{paddingTop:"20px"}}>{props.name}</h5>
    
  </div>
</div>
    </div>
  )
}
export default GoogleMeet;
