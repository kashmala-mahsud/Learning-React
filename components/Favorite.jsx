import React from "react";
import useFavorite from "./FavoriteContext1";

function Favorite() {
  let { favoriteParticipants, toggledFavorite } = useFavorite();

  return (
    <div
      className="favorite-particpants"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <h2>Favorites</h2>
      {favoriteParticipants.length === 0 ? (
        <p>No favorite added yet.</p>
      ) : (
        favoriteParticipants.map((fav) => (
          <div
            className="card"
            key={fav.name}
            style={{
              width: "18rem",
              margin: "10px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div className="card-body">
              <div className="favorite-card">
                {fav.img ? (
                  <img
                    src={fav.img}
                    alt={fav.name}
                    style={{
                      borderRadius: "50px",
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <div
                    className="box"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50px",
                      backgroundColor: "pink",
                      fontSize: "30px",
                      fontWeight: "800",
                    }}
                  >
                    {fav.name[0]}
                  </div>
                )}
                <h5>{fav.name}</h5>
                <button
                  onClick={() => toggledFavorite(fav.name)}
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  <i className="fa-solid fa-heart"></i> Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Favorite;
