import api from "../utils/axios";

const create = (data) => api.post("products/create", data);

const list = () => api.get("products/list");
const update = (data) => api.put("products/update", data);

const deleteProduct = (id) => api.delete(`products/${id}/delete`);

export default {
    create,
    list,
    update,
    deleteProduct,
};
