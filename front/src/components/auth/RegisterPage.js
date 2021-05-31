import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { useHistory } from "react-router";
import ErrorSnackbar from "../utils/ErrorSnackbar";
import { useDispatch } from "react-redux";
import auth from "../../services/auth";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const form = {
        name: "",
        email: "",
        cellphone: "",
        cpf: "",
        password: "",
        password_confirmation: "",
        birthdate: new Date(),
    };

    const [model, setModel] = useState(form);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModel({
            ...model,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const { data } = await auth.register(model);
            dispatch({
                type: "REGISTER",
                payload: data.data,
            });
            history.push("/products/list");
        } catch (error) {
            setError(error.response);
            setShowSnackBar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error ? (
                <ErrorSnackbar
                    showSnackBar={showSnackBar}
                    error={error}
                    setShowSnackBar={setShowSnackBar}
                />
            ) : (
                <></>
            )}
            <form
                action=""
                onSubmit={(e) => onSubmit(e)}
                style={{ marginTop: "2.5rem" }}
            >
                <Grid container spacing={10}>
                    <Grid container alignItems="center" justify="center">
                        <Box mt={5} textAlign="center">
                            <h2>Register</h2>
                        </Box>
                    </Grid>
                    <Grid
                        container
                        spacing={4}
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={8}>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={model.name}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={model.email}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="cellphone"
                                label="Cellphone"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={model.cellphone}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="cpf"
                                label="Cpf"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={model.cpf}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Birthdate"
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                    onChange={(e) => handleChange(e)}
                                    value={model.birthdate}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={model.password}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="password_confirmation"
                                label="Confirm password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={model.password_confirmation}
                            />
                        </Grid>
                        <Grid item xs={8} style={{ textAlign: "center" }}>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                >
                                    Register
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default RegisterPage;
