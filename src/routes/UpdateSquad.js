import Menu from "../components/menu/Menu";
import Form from "../components/squad/edit-squad/Form";

export default function UpdateSquad (props)
{
    return (
        <>
          <div id="menu">
            <Menu/>
          </div>
          <div id="content" className='container'>
            <Form/>
          </div>
        </>
      );
}