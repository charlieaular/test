import { Box, Grid, Hidden } from "@material-ui/core";
import React from "react";

import { useSelector } from "react-redux";

import ProductTable from "./components/ProductTable";

const ListProductsPage = () => {
    const user = useSelector((state) => state.user);

    return (
        <>
            <Grid container style={{ marginTop: "2rem" }}>
                <Hidden mdDown>
                    <Grid item xs={4} className="hidden-sm">
                        <p>User information</p>
                        <Grid container direction="column" spacing={4}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box>Users name</Box>
                                    {user.name}
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>Users email</Box>
                                    {user.email}
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box>Users cellphone</Box>
                                    {user.cellphone}
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>Users cpf</Box>
                                    {user.cpf}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Hidden>
                <Grid item xs>
                    <ProductTable />
                </Grid>
            </Grid>
        </>
    );
};

export default ListProductsPage;
