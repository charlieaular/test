import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

const ErrorSnackbar = (props) => {
    return (
        <Snackbar
            open={props.showSnackBar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
            onClose={() => props.setShowSnackBar(false)}
        >
            <Alert elevation={6} variamt="filled" severity="error">
                {Object.values(props.error.data.data).map((el) => (
                    <div key={el}>{el}</div>
                ))}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
