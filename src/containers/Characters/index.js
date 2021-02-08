import React, { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import Card from "../../components/Card"

const Characters = (props) => {
    const { name, description, thumbnail, isLoading, _id, characterSearch, handleCharacterSearch } = props;
    const [ favorite, setFavorite ] = useState([]);
    const newFavorite = [...favorite];

    const handleFavorite = () => {
      let newFavorite = {
        id: _id,
        name: name,
        description: description,
        thumbnail: thumbnail.path + "." + thumbnail.extension
      };
      setFavorite(newFavorite)
      Cookies.set("userFavorites", newFavorite, { expires: 200});
      console.log(newFavorite)

    };

    
  return (
    <div>
                <Card
                name={name}
                description={description}
                thumbnail={thumbnail}
                _id={_id}
                handleFavorite={handleFavorite}
                />
    </div>
  )
}

export default Characters;


