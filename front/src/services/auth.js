import api from "../utils/axios";

const login = (data) => api.post("auth/login", data);

const register = (data) => api.post("auth/register", data);

const authenticatedUser = () => api.post("auth/authenticated-user");

export default {
    login,
    register,
    authenticatedUser,
};
