import React from 'react';
function NftCards({ nft , onEdit , onDelete}) {
  if (!nft) return null;

 

  return (
    <div style={{ width:"50%" , height:"auto"}}>
    <div className="card" >
      <div className='card-body'>
      <img src={nft.image} alt={nft.title} style={{width:"100px" , height:"100px"}}/>
      <h3>{nft.title}</h3>
      <p>Rank: {nft.rank}</p>
      <p>Author: {nft.author}</p>
      <p>Price (ETH): {nft.price_eth}</p>
      <p>Price (USD): {nft.price_usd}</p>
      <div className='button-group'>
      <button variant="primary" onClick={()=> onEdit(nft)}>Edit</button>
      <button variant="danger" onClick={()=> onDelete(nft.id)}>Delete</button></div>
    </div></div></div>
  );
}

export default NftCards;