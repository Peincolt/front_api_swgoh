import { useEffect, useState } from 'react';
import Menu from '../components/menu/Menu.js';
import Filter from '../components/filter/Filter.js';
import Array from '../components/filter/Array';
import FilterContextProvider from '../components/filter/context/FilterContext';

function Home() {
  const [ arraySquads, setArraySquads ] = useState([])

  const headerArray = {name: 'Nom de l\'équipe', used_for: 'Utilisée pour', type: 'Type d\'unités', };
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
            obj['icon'] = <>
              <a 
                href={'http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/'+obj.unique_identifier} 
                rel='noopener noreferrer' target='_blank'><Search/></a>
              <a 
                href={'http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/'+obj.unique_identifier} 
                rel='noopener noreferrer' target='_blank'><Pencil/></a>
            </>
            for (let x = 0; x < jsonKeys.length; x++) {
                if (!keysHeader.includes(jsonKeys[x])) {
                    delete obj[jsonKeys[x]]
                }
            }
            
            return obj
          })
        }
        setArraySquads(json)
      },
      (error) => {
        setArraySquads([]);
      }
    )
  },[])
  return (
    <div className="App">
        <Menu/>
        <FilterContextProvider>
          <Filter/>
          <Array header={headerArray} content={arraySquads}/>
        </FilterContextProvider>
    </div>
  );
}

export default Home;