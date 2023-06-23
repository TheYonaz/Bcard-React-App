import React, { useState, useEffect } from "react";

import { colorLog } from "../utils";

const LifecycleExe1 = () => {
  const [count, setCount] = useState(() => {
    colorLog(`1`, "red");
    setTimeout(() => {
      colorLog("5","yellow");
    }, 1000);
    return 0;
  });
  useEffect(() =>{
    colorLog("3", "blue");
  return () => {colorLog("6","orange")}},[]
  )
  useEffect(() =>{
    colorLog("4", "blue");
  },[count]
  )

  return (
    <div>
      LifecycleExe1
      {colorLog("2","purple")}
      {count}
      <button
        style={{ padding: 4, margin: 2 }}
        onClick={() => setCount(prev => prev + 456)}>
        +
      </button>
    </div>
  );
};

export default LifecycleExe1;
