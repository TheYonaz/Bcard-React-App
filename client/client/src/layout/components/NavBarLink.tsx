import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: JSX.Element[] | JSX.Element;
  color?: string;
};

const NavBarLink: React.FC<Props> = ({ to, children, color = "#fff" }) => {
  return (
    <Link to={to} style={{ color, textDecoration: "none" }}>
      {children}
    </Link>
  );
};

export default NavBarLink;
