import React from "react";

const StringInterpolation = () => {
  const x = "hallo";

  /* comment */
  // comment
  return (
    <div>
      {x} world
      <br />
      {6 * 5}
      {/* comment */}
    </div>
  );
};

export default StringInterpolation;
