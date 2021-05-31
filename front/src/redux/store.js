import { createStore } from "redux";

const initialState = {
    user: {},
    token: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER":
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case "AUTHENTICATED":
            return {
                ...state,
                user: action.payload.user,
                token: localStorage.getItem("token"),
            };

        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                user: {},
                token: "",
            };

        default:
            return state;
    }
};

export default createStore(authReducer);
