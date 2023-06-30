import Menu from "../components/menu/Menu";
import Form from "../components/create-squad/Form";

export default function CreateSquad()
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