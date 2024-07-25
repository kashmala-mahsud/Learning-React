import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import GoogleMeet from "./components/GoogleMeet";
// import Favorite from "./components/Favorite";
// import { FavoriteProvider } from "./components/FavoriteContext1";
// import useFavorite from "./components/FavoriteContext1";
import Timer from "./components/Timer";
function App() {

  // const { favParticipants, loading } = useFavorite();

  // console.log("Participants from context:", favParticipants); // Debugging statement

  return (
    <div>
      <Timer RemainTime="july,26,2024"/>
    {/* <div className="cardsbody">
      <h1>Cards</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          {favParticipants && favParticipants.length > 0 ? (
            favParticipants.map((participant) => (
              <GoogleMeet key={participant.name} participant={participant} />
            ))
          ) : (
            <p>No participants available</p>
          )}
        </div>
      )}
      <Favorite />
    </div> */}
    </div>
  );
  
}

// const WrappedApp = () => (
//   <FavoriteProvider>
//     <App />
//   </FavoriteProvider>
// );

// export default WrappedApp;
export default App;