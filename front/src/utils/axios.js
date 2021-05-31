import axios from "axios";
import { useDispatch } from "react-redux";

const token = localStorage.getItem("token");

let headers = {};

if (token) {
    headers = {
        Authorization: `Bearer ${token}`,
    };
}

const api = axios.create({
    baseURL: "http://192.168.0.25:8000/api/",
    headers,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // whatever you want to do with the error
        if (error && error.response && error.response.status == 401) {
            const dispatch = useDispatch();
            dispatch({
                type: "LOGOUT",
            });
            window.location.href = "/login";
            console.log(error.response);
        }
        throw error;
    }
);

export default api;
