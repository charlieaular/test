import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import ErrorSnackbar from "../utils/ErrorSnackbar";
import auth from "../../services/auth";

const LoginPage = () => {
    const history = useHistory();

    const [showSnackBar, setShowSnackBar] = useState(false);
    const dispatch = useDispatch();
    const toRegister = () => history.push("/register");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const model = {
        email: "",
        password: "",
    };

    const [form, setForm] = useState(model);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await auth.login(form);
            dispatch({
                type: "LOGIN",
                payload: data,
            });
            history.push("/products/list");
        } catch (error) {
            alert(error);
            setError(error.response);
            setShowSnackBar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mt-5">
                <h2 className="text-center">Log In</h2>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{ width: "100%" }}
                >
                    <div className="row justify-content-center m-2">
                        <div className="col-12 col-md-12">
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={form.email}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center m-2">
                        <div className="col-12 col-md-12">
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={(e) => handleChange(e)}
                                value={form.password}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="row">
                            <div className="col">
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="submit"
                                        className="col-10 col-md-2"
                                    >
                                        Log in
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Button onClick={toRegister}>Sign in</Button>
                            </div>
                        </div>
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
        </>
    );
};

export default LoginPage;
