import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ROUTES from "../../../../routes/routesModel";
import NavItem from "../../../components/NavItem";


const NotLogged = () => {
  return (
    <Box>
      <NavItem to={ROUTES.SIGNUP} label="SIGNUP" color="inherit"/>
      <NavItem to={ROUTES.LOGIN} label="LOGIN" color="inherit"/>
    </Box>
  );
};

export default NotLogged;
