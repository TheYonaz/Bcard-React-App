import React, { MouseEvent } from "react";
import Button from "@mui/material/Button";
/********* onClick with events **********/

const OnClick = () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <Button variant="outlined" sx={{ m: 2 }} onClick={handleClick}>
        Click me
      </Button>

      <Button variant="outlined" sx={{ m: 2 }} onClick={(e) => handleClick(e)}>
        Click me Too!!!
      </Button>
    </>
  );
};

export default OnClick;
