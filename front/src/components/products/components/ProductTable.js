import React, { useState, useEffect } from "react";

import { Create, Delete, Add } from "@material-ui/icons";
import { Tooltip, IconButton, Fab, CircularProgress } from "@material-ui/core";
import CreateProductModal from "./CreateProductModal";
import ErrorSnackbar from "../../utils/ErrorSnackbar";
import product from "../../../services/product";
import EditProductModal from "./EditProductModal";

const ProductTable = () => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productEdit, setProductEdit] = useState({});

    useEffect(() => {
        setLoading(true);

        fetchProducts();
        setLoading(false);
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await product.list();
            setProducts(data);
        } catch (er) {
            setError(er.response);
            setShowSnackBar(true);
        }
    };

    const onDelete = async (id) => {
        try {
            await product.deleteProduct(id);
            fetchProducts();
        } catch (er) {
            setError(er.response);
            setShowSnackBar(true);
        }
    };

    const onEditProduct = (product) => {
        setProductEdit(product);
        setOpenEdit(true);
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            {!products.length ? (
                <div>No products ...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Serie</th>
                                <th scope="col">Width</th>
                                <th scope="col">Height</th>
                                <th scope="col">Creator</th>
                                <th scope="col" className="text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.serie}</td>
                                    <td>{product.width}</td>
                                    <td>{product.height}</td>
                                    <td>{product.user.name}</td>
                                    <td className="text-center">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={() =>
                                                    onEditProduct(product)
                                                }
                                            >
                                                <Create />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() =>
                                                    onDelete(product.id)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="row">
                <div className="col">
                    <Tooltip title="Add" aria-label="add">
                        <Fab color="primary" onClick={() => setOpen(true)}>
                            <Add />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
            <CreateProductModal
                open={open}
                handleClose={() => setOpen(false)}
                fetchProducts={fetchProducts}
            />
            <EditProductModal
                open={openEdit}
                product={productEdit}
                handleClose={() => setOpenEdit(false)}
                fetchProducts={fetchProducts}
            />
            {error ? (
                <ErrorSnackbar
                    showSnackBar={showSnackBar}
                    error={error}
                    setShowSnackBar={setShowSnackBar}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default ProductTable;
