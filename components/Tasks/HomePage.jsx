import {  useEffect, useState } from "react";
import axios from "axios";
import NftCard from "./NftsCards";
export  function HomePage(){
    let [nfts, setNfts]=useState([]);
    let [loading, setLoading]=useState(true);
    const [error, setError]= useState("")
useEffect(() => {
      
          axios.get("http://localhost:4000/nfts").then(response=>{
            setNfts(response.data);
            setLoading(false);
            
        })
      .catch (error => {
       setError('false to fetch the data ') 
       setLoading(false);
      });
    
  }, []);
  if (loading) {
    return <div>loading...</div>
  }
  else if (error){
    return <div>{error}</div>
  }
  else if (nfts.length===0) {
    return <div>No data available</div>
  }
  return (
    <div className="nfts-data">
     {nfts.map(nft=>(
        <NftCard key={nft.rank} nft={nft} />
     ))}
    </div>
  )

}