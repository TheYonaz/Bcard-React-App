import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBarLink from "../../../components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";
import NavItem from "../../../components/NavItem";
import userEvent from "@testing-library/user-event";
import { useUser } from "../../../../users/providers/UserProviders";

const LeftNavBar = () => {
  const { user } = useUser();
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem to={ROUTES.ABOUT} label="About" color="inherit" />
        {user && (
          <>
            <NavItem to={ROUTES.FAV_CARDS} label="FAV CARDS" color="inherit" />
            {user.isBusiness && (
              <NavItem to={ROUTES.MY_CARDS} label="MY CARDS" color="inherit" />
            )}
            {user.isAdmin && (
              <NavItem to={ROUTES.SANDBOX} label="SANDBOX" color="inherit" />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
