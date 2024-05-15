import { useReducer, useState } from "react";
import { RequestLogin } from "../interfaces/tinsmartApiInterfaces"


export interface LoginData{

    correo: string;
    password: string;
}

const 



export const useLogin = () => {


    const [ loading, setLoading ] = useState<boolean>( true );

    const [ state, dispatch ] = useReducer( dataReducer, initalLogin )



}


const response = await 