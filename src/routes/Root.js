import Menu from '../components/menu/Menu.js';
import FilterSquad from '../components/filter/FilterSquad.js';
import FilterContextProvider from '../components/filter/context/FilterContext.js';

export default function Root() {
  return (
    <>
      <div id="menu">
        <Menu/>
      </div>
      <div id="content" className='container'>
        <FilterContextProvider>
          <FilterSquad/>
        </FilterContextProvider>
      </div>
    </>
  );
}