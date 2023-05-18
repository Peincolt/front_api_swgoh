import Menu from '../components/menu/Menu.js';
import FilterSquad from '../components/filter/FilterSquad.js';

export default function Root() {
  return (
    <>
      <div id="menu">
        <Menu/>
      </div>
      <div id="content">
        <FilterSquad/>
      </div>
    </>
  );
}