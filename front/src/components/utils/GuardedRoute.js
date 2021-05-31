import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, ...rest }) => {
    const token = useSelector((state) => state.token);
    const localToken = localStorage.getItem("token");
    return (
        <Route
            {...rest}
            render={(props) =>
                token || localToken ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default GuardedRoute;
