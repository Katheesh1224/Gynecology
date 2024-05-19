import { atom } from "recoil";

const userState = atom({
    key:'UserState',
    default: null
})


export {userState}