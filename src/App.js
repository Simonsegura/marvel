import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { useDebounce } from "use-debounce";


import Characters from "./containers/Characters/index";
import Comics from "./containers/Comics/index";
import Favorits from "./containers/Favorits/index";
import Fiche from "./containers/Fiche/index"

import logo from "./assets/img/langfr-1920px-MarvelLogo.svg_uw9pi8.png"
import cover from "./assets/img/cover.png"



function App() {

  const [characters, setCharacters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [characterSearch, setCharacterSearch] = useState("");
  const [debouncedCharacterSearch] = useDebounce(characterSearch, 1500);

  useEffect(() => {
    const fetchCharacters = async () => {
      const params = {
        name: debouncedCharacterSearch,
      };
      const queryParams = qs.stringify(params);
      try {
      const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters/?${queryParams}&apiKey=gq05TsEzANFYO7Zs`);
      setCharacters(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  fetchCharacters();
}, [debouncedCharacterSearch]);
 
const handleCharacterSearch = (event) => {
  setCharacterSearch(event.target.value);
};
 
   

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <Router>
      <div className="App">
        <header>
            <img className="Logo" src={logo} alt="Logo Marvel"/>
              <nav className="menu">
                <div>
                    <Link to="/">Characters</Link>
                </div>
                <div>
                    <Link to="/comics">Comics</Link>
                </div>
                <div>
                    <Link to="/favorits">Favorits</Link>
                </div>
              </nav>
        </header>

        <div className="Cover">
          <img src={cover} alt="Les héros de Marvel"/>
        </div>
        
       
        <Switch>
          <Route path="/comics">
            <Comics/>
          </Route>
          <Route path="/favorits">
            <Favorits />
          </Route>
          <Route path="/fiche/:id">
            <Fiche />
          </Route>
          <Route path="/">
            <div className="Characters">
               <div className="search-bar-div">
                  <input
                    className="search-bar"
                    type="text"
                    value={characterSearch}
                    placeholder="Search..."
                    onChange={(event) => {
                      handleCharacterSearch(event);
                    }}
                  />
                </div>
            {characters.map((character) => {
              return <Characters
              {...character}
              key={character._id}
              isLoading={isLoading}
              characterSearch={characterSearch}
              handleCharacterSearch={handleCharacterSearch}/>
            })} 
            </div>
            
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
