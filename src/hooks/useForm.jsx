import { useState } from "react"

export const useForm = () => {

const [user, setUser] = useState({});

const change = ({target}) =>{
    let {name, value} = target;
    setUser({
        ...user,
        [name]: value
    })
}

  return {
    user,
    change
  }
}
