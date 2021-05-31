import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    Switch,
    Route,
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import CreateProductModal from "./components/products/components/CreateProductModal";
import ListProductsPage from "./components/products/ListProductsPage";
import GuardedRoute from "./components/utils/GuardedRoute";
import auth from "./services/auth";

const App = () => {
    const dispatch = useDispatch();
    useEffect(async () => {
        try {
            const { data } = await auth.authenticatedUser();
            dispatch({
                type: "AUTHENTICATED",
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <Router>
                <Container>
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <GuardedRoute
                            path="/products/list"
                            component={ListProductsPage}
                        />
                        <GuardedRoute
                            path="/products/create"
                            component={CreateProductModal}
                        />
                        <Redirect to="/login" />
                    </Switch>
                </Container>
            </Router>
        </>
    );
};

export default App;
