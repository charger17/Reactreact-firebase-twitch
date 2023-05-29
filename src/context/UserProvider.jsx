import { createContext, useState } from "react"

export const Usercontext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)
  return (
    <Usercontext.Provider value={{user, setUser}}>
        {props.children}
    </Usercontext.Provider>
  )
}

export default UserProvider