import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Card from "../../components/Card"
import "./index.css";


const Favorits = () => {
  let cookieFavorites = [];
  if (Cookies.get("userFavorites")) {
    cookieFavorites = JSON.parse(Cookies.get("userFavorites"))
  };

  const [favorites, setFavorites] = useState([cookieFavorites]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (favorites) {
      setFavorites(favorites);
      setIsLoading(false);
      console.log(favorites)
    }
  }, [favorites]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="Card">
      {favorites.map((favorite, index) => {
        return (
          <div className="Characters-card">
            <img className="character-image" src={favorite.thumbnail} alt=""/>
            <h2>{favorite.name}</h2>
            {favorite.description ? 
            <p>Description : {favorite.description}</p>:
            <p>Pas de description</p>}
        </div>
        )
      })}
    </div>
  );
};

export default Favorits;