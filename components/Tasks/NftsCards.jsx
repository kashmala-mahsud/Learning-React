import React from "react";
const NftCard= ({nft}) => (
    <div className="nft-card">
        <img src="{nft-card}" alt={nft.title}/>
        <h3>{nft.title}</h3>
        <p>{nft.rank}</p>
        <p>Author:{nft.author}</p>
        <p>Price:{nft.price_eth}</p> 
        <p>Price:{nft.price_usd}</p> 
    </div>
)
export default NftCard;