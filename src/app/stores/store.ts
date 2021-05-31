import { createContext, useContext } from "react";
import CarStore from "./carStore";

interface Store{
    carStore: CarStore
}
export const store:Store={
    carStore:new CarStore()
}
export const StoreContext= createContext(store);

export function useStore(){
    return useContext(StoreContext);
}