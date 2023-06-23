import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuLink from "./MenuLink";

import ROUTES from "../../../../routes/routesModel";
import useHandleUsers from "../../../../users/hooks/useHandleUsers";
import { useUser } from "../../../../users/providers/UserProviders";

type Props = {
  isOpen: boolean;
  anchorEl: HTMLElement;
  onClose: () => void;
};

const Menu: React.FC<Props> = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useUser();
  const { handleLogout } = useHandleUsers();

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        <MenuLink
          label="HOME"
          navigateTo={ROUTES.CARDS}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />
        <MenuLink
          label="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user && (
          <>
            <MenuLink
              label="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            <MenuLink
              label="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </>
        )}
        {user && (
          <>
            <MenuLink
              label="FAV CARDS"
              navigateTo={ROUTES.FAV_CARDS}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            {(user.isBusiness||user.isAdmin) &&<MenuLink
              label="My Cards"
              navigateTo={ROUTES.MY_CARDS}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />}
            {(user.isAdmin) &&<MenuLink
              label="sandbox"
              navigateTo={ROUTES.SANDBOX}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />}
            <MenuLink label="profile" navigateTo={"/"} onClick={onClose} />
            <MenuLink label="edit account" navigateTo={ROUTES.EDIT_USER} onClick={onClose} />

            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;
