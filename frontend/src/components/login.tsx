import { useNavigate } from "react-router-dom"
import axios from 'axios';

type userLogin = {
  email : string,
  password: string
}
const Login = () => {


   //const []
   const navigate = useNavigate();
 
   const handleSubmit = async (e:any)=>{
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const postData = {
          "username": email,
          "password": password
      }
      try{
          const response =  await axios.post('http://localhost:8000/api/v1/user/login', postData)
          
          const user  = response.data.user;
          const token = response.data.token;
          console.log('User',user);
          console.log('Token', token);
          localStorage.setItem('token', token);
          navigate('/dashboard', {state: {data: user}});
        }catch(error){
          console.log('Error', error);
      } 
   }

  return (
    <div style={{width:'100%', height:'600px', backgroundColor:'grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div className="max-w-md w-4/5 m-auto bg-white m-10">
          
           <h1 className=" text-3xl md:text-4xl font-bold mt-5 text-center">Sign In</h1>
           <p className="m-3 font-medium text-zinc-600 text-lg text-center">Enter your credentials to access your account</p>
          
         
           <form  onSubmit={handleSubmit}>
           <div className="flex justify-start flex-col  m-5">
               <label htmlFor="Email" className="text-xl font-bold text-left mb-2">Email</label>
                <input type="text" className="border-black border-2 text-xl text-zinc-600 px-2 rounded-md" name="email" placeholder=""/>
           </div>

           <div className="flex justify-start flex-col  m-5">
               <label htmlFor="Password" className="text-xl font-bold text-left mb-2">Password</label>
                <input type="password" className="border-black border-2 text-xl text-zinc-600 px-2 rounded-md" name="password" placeholder=""/>
           </div>

           <div className="bg-black w-4/5 mx-auto h-9 rounded-md flex items-center justify-center">
             <button className="text-white text-center font-bold text-xl" type="submit">Sign In</button>
           </div>
           </form>

           <p className="m-3 text-center">Don't have an account?<span className="underline underline-offset-1 "> Sign Up</span></p>
      
    </div>
     
</div>
  )
}

export default Login