
const Login = () => {
  return (
    <div style={{width:'100%', height:'600px', backgroundColor:'grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div className="max-w-md w-4/5 m-auto bg-white m-10">
          
           <h1 className=" text-3xl md:text-4xl font-bold mt-5">Sign In</h1>
           <p className="m-3 font-medium text-zinc-600 text-lg">Enter your credentials to access your account</p>
          
         

           <div className="flex justify-start flex-col  m-5">
               <label htmlFor="Email" className="text-xl font-bold text-left mb-2">Email</label>
                <input type="text" className="border-black border-2 text-xl text-zinc-600 px-2 rounded-md" placeholder=""/>
           </div>

           <div className="flex justify-start flex-col  m-5">
               <label htmlFor="Password" className="text-xl font-bold text-left mb-2">Password</label>
                <input type="password" className="border-black border-2 text-xl text-zinc-600 px-2 rounded-md" placeholder=""/>
           </div>

           <div className="bg-black w-4/5 mx-auto h-9 rounded-md flex items-center justify-center">
             <button className="text-white text-center font-bold text-xl">Sign In</button>
           </div>

           <p className="m-3">Don't have an account?<span className="underline underline-offset-1 "> Sign Up</span></p>
      
    </div>
     
</div>
  )
}

export default Login