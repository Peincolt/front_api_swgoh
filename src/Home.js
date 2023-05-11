import { useEffect, useRef, useState } from 'react';
import './App.css';
import Menu from './components/menu/Menu.js';
import Filter from './components/filter/Filter.js';
import Array from './components/filter/Array';
import FilterContextProvider from './components/filter/context/FilterContext';

function Home() {
  const [ resultTeam, setResultTeam ] = useState([])
  const headerArray = {name: 'Nom de l\'équipe',type: 'Type d\'unités', used_for: 'Utilisée pour'};
  useEffect(() => {
    fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/search", {
      method: 'POST'
    })
    .then(res => res.json())
    .then(
      (json) => {
        if (json.length > 0) {
          let keysHeader = Object.keys(headerArray)
          let jsonKeys = Object.keys(json[0])
          json.map(obj => {
            for (let x = 0; x < jsonKeys.length; x++) {
                if (!keysHeader.includes(jsonKeys[x])) {
                    delete obj[jsonKeys[x]]
                }
            }
            return obj
          })
        }
        setResultTeam(json)
      },
      (error) => {
        setResultTeam([]);
      }
    )
  },[])
  return (
    <div className="App">
        <Menu/>
        <FilterContextProvider>
          <Filter/>
          <Array header={headerArray} content={resultTeam}/>
        </FilterContextProvider>
    </div>
  );
}

export default Home;