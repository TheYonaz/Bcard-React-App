import React,{ChangeEvent} from 'react'
import { useName } from '../context/NameProvider'


const CustomName = () => {
    const {name, setName} = useName()
  return (
    <div>
        {name}
    <input type="text" onChange={(event) =>setName(event.target.value)}></input>
    </div>
  )
}

export default CustomName