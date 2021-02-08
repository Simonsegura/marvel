import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";



const Comics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState({});
    const fetchComics = async () => {
        const response = await axios.get("https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=gq05TsEzANFYO7Zs")
        let newData = [...response.data.results];
        newData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setComics(newData);
        setIsLoading(false);
      };

      useEffect(() => {
        fetchComics();
      }, []);
    
      return isLoading ? (
        <span>En cours de chargement...</span>
        ) : ( 
                <div className="Comics">
                    {comics.map((comic) => {
                        return (
                            <div className="comics-card">
                                <h2>{comic.title}</h2>
                                {comic.description ?
                                <p>{comic.description}</p>:
                                <p>Pas de description</p>}
                                <img className="comic-image" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt=""/>
                            </div>
                        )
                        
                    })}
                </div>
            
      
    )
}

export default Comics;