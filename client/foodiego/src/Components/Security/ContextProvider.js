import { createContext, useContext, useState } from "react"
import { retrieveUser } from "../api/foodiegoAPI";
const context = createContext();
export const useMyContext = () => useContext(context)

const ContextProvider = ({children}) =>
{
    const [authenticated, setAuthenticated] = useState(false)
    const [theme, setTheme] = useState(false);
    const user = "hari@gmail.com"
    const [userDetails, setUserDetails] = useState(null)
    const logIn = (username, password) =>
    {
        if((username==='hari@gmail.com' && password==="WASDskal") || (username==='reddy@gmail.com' && password==="WASDskal"))
        {
            setAuthenticated(true)

            retrieveUser(user)
            .then(( response ) => {
                setUserDetails(response.data)
                console.log(response.data)})
            
            .catch(( error) => console.log(error))
            
            return true
        }
        else 
        {
            setAuthenticated(false)
            return false;
        }
    }
    
    return(
        < context.Provider value={ {authenticated, setAuthenticated, theme, setTheme, logIn, userDetails, setUserDetails } }>
            {children}
        </context.Provider>
    )
}
export default ContextProvider