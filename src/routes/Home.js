import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import FilterSquad from '../components/filter/FilterSquad.js';
import FilterContextProvider from '../components/filter/context/FilterContext.js';
import Skeleton from '../components/common/Skeleton.js';
import { importGuildSquad } from "../services/Api.js";
import { Helmet } from 'react-helmet-async';


export default function Root() {
  const headerArray = {name: 'Nom de l\'équipe', used_for: 'Utilisée pour', type: 'Type d\'unités', action: 'Actions'};
  const [ squads ] = useState(useLoaderData()[0]);
  return (
    <Skeleton>
      <Helmet>
        <title>HGamers II - Accueil</title>
      </Helmet>
      <FilterContextProvider>
        <FilterSquad headerArray={headerArray} squads={squads}/>
      </FilterContextProvider>
    </Skeleton>
  );
}

export async function loader()
{
  const squads = await importGuildSquad()
  return [squads, false];
}