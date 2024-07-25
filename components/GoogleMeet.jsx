import React, { useState } from "react";
import useFavorite from "./FavoriteContext1";

function GoogleMeet({ participant}) {
  let {toggledFavorite}=useFavorite();
  function ValuesAdd() {
    if (participant.img === "") {
      return participant.name[0];
    } else {
      return (
        <img
          src={participant.img}
          style={{ borderRadius: "50px" }}
          alt={participant.name}
        />
      );
    }
  }

  return (
    <div className="cards">
      <div className="card" style={{ width: "18rem"}}>
        <div className="card-body">
          <div
            className="box"
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50px",
              backgroundColor: "pink",
              fontSize: "35px",
              fontWeight: "800",
              padding: "20px, 0 ,50px,0",
            }}
          >
            {ValuesAdd()}
          </div>
          <h5 className="card-name" style={{ paddingTop: "20px" }}>
            {participant.name}{" "}
          </h5>
          <button onClick={()=>toggledFavorite(participant.name)}>
            <i className={participant.isFavorite?
           'fa-solid fa-heart': 'fa-regular fa-heart'}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default GoogleMeet;
