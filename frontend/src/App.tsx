import './App.css'
import {Link } from "react-router-dom"
function App() {
  
  
  return (
    <> 
              
       <h1>Landing Page</h1>
       <Link to="/sign_up">Sign Up</Link>
       <br />
       <Link to="/login">Login</Link>
       <br />
       <Link to="/dashboard">Dashboard</Link>
       
       
    </>
  )

}

export default App
