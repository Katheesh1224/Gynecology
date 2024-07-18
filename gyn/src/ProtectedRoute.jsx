import { useRecoilValue } from "recoil";
import { userState } from "./atom";

export default ({children})=>{

    // const isLoggedIn = useRecoilValue(userState);
    const isLoggedIn = true;

    console.log(isLoggedIn)

    return (
        isLoggedIn ? (children) : <p>You aren't allowed</p>
    )
}