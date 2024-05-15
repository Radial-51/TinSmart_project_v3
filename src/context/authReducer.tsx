// authReducer.ts

import { AuthState, LoginResponse } from "./AuthContext";
import { Input } from "../hooks/useFormHookContext";

type AuthAction =
    | { type: 'signIn', payload: LoginResponse }
    | { type: 'logout' }
    | { type: 'changeFavImage', payload: string }
    | { type: 'changeUserName', payload: string }
    | { type: 'formData', payload: Input[] };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'formData':
            return {
                ...state,
                formData: action.payload
            };
        case "signIn":
            return {
                ...state,
                isLoggedIn: true,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password
            };
        case "logout":
            return {
                ...state,
                isLoggedIn: false,
                name: "",
                email: "",
                password: ""
            };
        case "changeFavImage":
            return {
                ...state,
                favoriteImage: action.payload
            };
        case "changeUserName":
            return {
                ...state,
                name: action.payload
            };
        default:
            return state;
    }
};
