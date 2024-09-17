import Login from "./LogInComponent"
import Cart from "./CartComponent"
import HeaderComponent from "./HeaderComponent"
import HomePage from"./HomePageComponent/HomePage"
import Restaurant from "./RestaurantComponents/RestaurantComponent"
import ErrorComponent from "./ErrorComponent"
import Delivery from "./Delivery"
import PaymentOptions from "./Payment"
import OrderDetails from "./YourOrderDetails"
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom"
import ContextProvider, { useMyContext } from "./Security/ContextProvider"


const AuthenticatdRoute = ({ children }) =>
{
    const myContext = useMyContext()
    if(myContext.authenticated) 
        return children
    console.log(myContext.authenticated);
    
    return <Navigate to='/login'/>
}

const FoodieGo = () =>
{
    const { restaurantId } = useParams()

    return(
        <div className="foodiego">
            <ContextProvider>
                <BrowserRouter>
                <HeaderComponent />
                <Routes>
                        <Route>
                            <Route path="/" element={< Login />}/>
                            <Route path="/login" element={< Login />}/>
                            <Route path="/foodieGo/home" element={<AuthenticatdRoute><HomePage /></AuthenticatdRoute>}/>
                            <Route path="/foodieGo/restaurant/:restaurantId" element={<AuthenticatdRoute><Restaurant restaurantId={restaurantId}/></AuthenticatdRoute>}/>
                            <Route path="/foodieGo/cart" element={<AuthenticatdRoute><Cart/></AuthenticatdRoute>}/>
                            <Route path="/foodieGo/delivery/:arrayString" element={<AuthenticatdRoute><Delivery /></AuthenticatdRoute>}/>
                            <Route path="/foodiego/delivery/payment/:arrayString" element={<AuthenticatdRoute><PaymentOptions /></AuthenticatdRoute>}></Route>
                            <Route path="/foodiego/delivery/payment/order_details/:arrayString" element={<AuthenticatdRoute><OrderDetails /></AuthenticatdRoute>}></Route>
                            <Route path="*" element={<ErrorComponent/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                
            </ContextProvider>
        </div>   
    )
}
export default FoodieGo
