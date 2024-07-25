import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FavoriteContext = createContext();

const useFavorite = () => useContext(FavoriteContext);
export default useFavorite;

export function FavoriteProvider({ children }) {
  const [favParticipants, setFavParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("http://localhost:4000/participants");
        console.log(response);
        const data = response.data;
            console.log("hello",data);
        const savedFavParticipants = localStorage.getItem("favoriteParticipants");
        const favoriteNames = savedFavParticipants ? JSON.parse(savedFavParticipants) : [];

        const participantsWithFavorites = data.map((p) =>
          favoriteNames.includes(p.name) ? { ...p, isFavourite: true } : p
        );
        setFavParticipants(participantsWithFavorites);
      } catch (error) {
        console.log(`Error fetching participants: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  useEffect(() => {
    const favoriteNames = favParticipants.filter(p => p.isFavourite).map(p => p.name);
    localStorage.setItem("favoriteParticipants", JSON.stringify(favoriteNames));
  }, [favParticipants]);

  const toggledFavorite = (participantName) => {
    setFavParticipants(prevParticipants =>
      prevParticipants.map(p =>
        p.name === participantName ? { ...p, isFavourite: !p.isFavourite } : p
      )
    );
  };

  const favoriteParticipants = favParticipants.filter(p => p.isFavourite);

  return (
    <FavoriteContext.Provider value={{ favParticipants, favoriteParticipants, toggledFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
}