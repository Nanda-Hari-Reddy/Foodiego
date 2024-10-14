import { createContext, useContext, useState } from "react"
import { authenticateUser, retrieveUser } from "../api/foodiegoAPI";
import { apiClient } from "../api/BaseURL";
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
    const logIn =  async (username, password) =>
    {
        const token = "Basic "+ window.btoa(username+ ":"+password)
        try {
                const response = await authenticateUser(token)
                if(response.status==200)
                {
                    setAuthenticated(true)
                    apiClient.interceptors.request.use(
                        (config) => {
                            config.headers.Authorization = token
                            return config
                        }
                    )
                    retrieveUser(user)
                    .then(( response ) => {
                        setUserDetails(response.data)
                        console.log(response.data)})
                    .catch(( error) => console.log(error))
                    return true
                }
        } catch (error) {
            setAuthenticated(false)
            console.log(error)
            return false
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