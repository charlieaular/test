import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Modal,
    TextField,
} from "@material-ui/core";
import product from "../../../services/product";
import ErrorSnackbar from "../../utils/ErrorSnackbar";

const EditProductModal = (props) => {
    const model = {
        id: props.product.id,
        name: props.product.name,
        serie: props.product.serie,
        width: props.product.width,
        height: props.product.height,
    };

    const [form, setForm] = useState(model);
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    useEffect(() => {
        setForm(props.product);
    }, [props.product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await product.update(form);
            cleanForm();
            props.fetchProducts();
            props.handleClose();
        } catch (error) {
            setError(error.response);
            setShowSnackBar(true);
        } finally {
            setLoading(false);
        }
    };

    const cleanForm = () => {
        setForm(model);
        setShowSnackBar(false);
        setError(false);
    };

    const onClose = () => {
        cleanForm();
        props.handleClose();
    };

    return (
        <>
            <Modal open={props.open} onClose={() => onClose()}>
                <div
                    className="card w-75"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="card-header">
                            <span>Edit product</span>
                        </div>
                        <div className="card-body">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={(e) => handleChange(e)}
                                        value={form.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="serie"
                                        label="Serie"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={(e) => handleChange(e)}
                                        value={form.serie}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="width"
                                        label="Width"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={(e) => handleChange(e)}
                                        value={form.width}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="height"
                                        label="Height"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={(e) => handleChange(e)}
                                        value={form.height}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="card-footer">
                            <Grid container justify="space-between" spacing={0}>
                                <Box display="flex" flexGrow={1}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => onClose()}
                                    >
                                        Close
                                    </Button>
                                </Box>
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                )}
                            </Grid>
                        </div>
                    </form>
                    {error ? (
                        <ErrorSnackbar
                            showSnackBar={showSnackBar}
                            error={error}
                            setShowSnackBar={setShowSnackBar}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default EditProductModal;
