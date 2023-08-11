import Menu from "../components/menu/Menu";
import Page from "../components/squad/edit-squad/Page";

export default function UpdateSquad (props)
{
    return (
        <>
          <div id="menu">
            <Menu/>
          </div>
          <div id="content" className='container'>
            <Page/>
          </div>
        </>
      );
}