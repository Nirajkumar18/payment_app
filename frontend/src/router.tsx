import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Sign from "./components/signup"
import Login from "./components/login"
import Dashboard from "./components/dashboard"
import PrivateRoutes from "./components/privateRoute"

export const router = createBrowserRouter([
     {
        path: "/",
        element: <App/>,
        

     },
     {
        path: "/sign_up",
        element: <Sign/>
     },
     {
        path: "/login",
        element: <Login/>
     },
     {
        path: "/dashboard",
        element: <PrivateRoutes/>,
        children: [
           {
               index: true,
               element: <Dashboard/>
           }
        ]
     }
     
])