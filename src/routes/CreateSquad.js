import Menu from "../components/menu/Menu";
import Page from "../components/squad/create-squad/Page";

export default function CreateSquad()
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