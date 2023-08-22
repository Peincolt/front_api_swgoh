import { useContext } from "react"
import { ThreeCircles } from "react-loader-spinner"
import { GlobalContext } from "./context/GlobalContextProvider"
export default function Spinner()
{
    const { globalData, setGlobalData } = useContext(GlobalContext)
    return (
        <ThreeCircles
            height="15%"
            width="15%"
            color="#000000"
            visible={globalData.spinner}
            wrapperStyle={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.7)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        />
    )
}