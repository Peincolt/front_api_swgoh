import FilterSquad from '../components/filter/FilterSquad.js';
import FilterContextProvider from '../components/filter/context/FilterContext.js';
import Skeleton from '../components/common/Skeleton.js';

export default function Root() {
  return (
    <Skeleton>
      <FilterContextProvider>
        <FilterSquad/>
      </FilterContextProvider>
    </Skeleton>
  );
}