
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

const Fiche = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=gq05TsEzANFYO7Zs`);
            setData(response.data);
            setIsLoading(false);
            console.log(response.data);
        };
        fetchData();
    }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="Fiche">
        <h1>{data.name}</h1>
        <h2>Appears in :</h2>
        {data.comics.map((comic, index) => {
            return <div key={index}>{comic.title}</div>
        })}
    </div>

  )
}

export default Fiche;