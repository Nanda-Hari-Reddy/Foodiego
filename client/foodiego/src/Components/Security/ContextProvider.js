import { createContext, useContext, useState } from "react"
import { retrieveUser } from "../api/foodiegoAPI";
const context = createContext();
export const useMyContext = () => useContext(context)

const ContextProvider = ({children}) =>
{
    const [authenticated, setAuthenticated] = useState(false)
    const [adminAuthenticated, setIsAdminAuthenticated] = useState(false)
    const [theme, setTheme] = useState(false);
    const user = "hari@gmail.com"
    const [userDetails, setUserDetails] = useState(null)
    const [admin, setAdmin] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
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

    const adminLogIn = (username, password) =>
    {
        if(username === "eat@rayalaseemaspice.com" && password === "Rayalaseema Spice")
        {
            setIsAdminAuthenticated(true)
            setAdmin(username)
            setAdminPassword(password)
            return true
        }
        else 
        {
            setIsAdminAuthenticated(false)
            return false;
        }
    }
    
    return(
        < context.Provider value={ {authenticated, setAuthenticated, theme, setTheme, logIn, userDetails, setUserDetails, admin, setAdmin, adminAuthenticated, setIsAdminAuthenticated} }>
            {children}
        </context.Provider>
    )
}
export default ContextProvider