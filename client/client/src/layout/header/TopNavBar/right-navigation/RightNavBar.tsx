import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SearchBar from "../search-bar/SearchBar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon  from "@mui/icons-material/LightMode";
import MoreButton from "./MoreButton";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import { useTheme } from "../../../../providers1/ThemeProviders1";
import { useUser } from "../../../../users/providers/UserProviders";


const RightNavBar = () => {
  const {user} =useUser()

  const { isDark, toggleDarkMode } = useTheme();
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <SearchBar />

        <IconButton onClick={toggleDarkMode} sx={{ marginLeft: 1 }}>
          {(!isDark) ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {!user && <NotLogged />}

        {user && <Logged />}
      </Box>

      <MoreButton //onClick={() => console.log("you clicked The more button!")}
      />
    </>
  );
};

export default RightNavBar;
