import { useEffect, useRef } from 'react';
import './App.css';
import Menu from './components/menu/Menu.js';
import Filter from './components/filter/Filter.js';
import Array from './components/filter/Array';
import FilterContextProvider from './components/filter/context/FilterContext';

function Home() {
  const resultTeam = useRef()
  useEffect(() => {
    fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/search", {
      method: 'POST'
    })
    .then(response => response.json())
    .then(
      (json) => {
        resultTeam.current = json
      },
      (error) => {
        resultTeam.current = [];
      }
    )
  },[])

  return (
    <div className="App">
        <Menu/>
        <FilterContextProvider>
          <Filter/>
          <Array content={resultTeam.current}/>
        </FilterContextProvider>
    </div>
  );
}

export default Home;