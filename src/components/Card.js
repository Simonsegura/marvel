import React from "react";
import {
    Link
  } from "react-router-dom";
const Card = (props) => {
    const { name, description, thumbnail, _id, handleFavorite } = props;

  return (
    <Link to={`/fiche/${_id}`}>
                          
        <div className="Characters-card">
        <img className="character-image" src={`${thumbnail.path}.${thumbnail.extension}`} alt=""/>
        <h2>{name}</h2>
        {description ? 
        <p>Description : {description}</p>:
        <p>Pas de description</p>}
        <span className="add-to-favorite" onClick={handleFavorite}>
            Add to favorite ⭐️</span>
        </div>

    </Link>
);
}

export default Card;