import GlobalContextProvider from "./context/GlobalContextProvider";
import Menu from "../menu/Menu"
import Spinner from "./Spinner";

export default function Skeleton({children})
{
    return (
        <>
            <GlobalContextProvider>
                <Spinner/>
                <div id="menu">
                    <Menu/>
                </div>
                <div id="content" className='container'>
                    {children}
                </div>
            </GlobalContextProvider>
        </>
    )
}