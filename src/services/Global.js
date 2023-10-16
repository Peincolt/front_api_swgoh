import { GlobalContext } from "../../common/context/GlobalContextProvider";
import { useContext } from "react";

export default function Global()
{
    const { setGlobalData } = useContext(GlobalContext)
}