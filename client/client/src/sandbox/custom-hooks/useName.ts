import { useState } from "react";

export const useName = (initialName:string ="") =>{
    const [name,setName] = useState(initialName)
    return {name,setName}
}