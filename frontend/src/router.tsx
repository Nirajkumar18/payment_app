import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Sign from "./components/signup"
import Login from "./components/login"

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
     }
     
])