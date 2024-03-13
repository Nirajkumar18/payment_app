import { useEffect, useState } from "react";
import { useLocation, } from "react-router-dom"
import axios from "axios";
import Modal from "./modal";

type usersList = {
    _id :string,
    username  :string,
    firstName:string,
    lastName:string,
    password: string
}
const Dashboard = () => {

   const location = useLocation();
   
   const {data} = location.state;
   
   console.log(data);
   const [users, setUsers] = useState<usersList[]>([])
   const [bal, setBalance] = useState(0);
   const [open, setOpen] = useState(false); 
   const [receiverData, setReceiverData] = useState({});

   console.log('users', users);
   const handleSubmit = ()=>{
      
      setOpen(false);
      
   }

   const submitHandler = (val: usersList)=>{
     
     
      setOpen(true);
      setReceiverData(val);
      console.log('submitHandler');
   }
   const getAccountDetails = async ()=>{
         
        try{
          const token = localStorage.getItem('token');
          const response = await axios.get("http://localhost:8000/api/v1/account/bal",{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          console.log('Balance',response.data.balance);
          setBalance(response.data.balance);
        }catch(error){
          console.log(error);
        }

   }


   useEffect(()=>{
       
      const getAllUsers = async ()=>{
           try{
            const token =localStorage.getItem('token');
            
            const usersList = await axios.get("http://localhost:8000/api/v1/user/info", {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }) 
            const usersInfo = usersList.data;
            //console.log('userlist', usersInfo);
            //console.log(...usersInfo);

            
            setUsers([...usersInfo]);
           }catch(error){
            console.log(error);
           }
      }

      getAllUsers();
      getAccountDetails();
        
   }, [open])
  

   
  return (
    <div>
           
         <div className="flex justify-between border-y-2">
             <h1 className="text-xl font-bold my-2">Payments App</h1>
             <h3 className="text-xl my-2">Hello, {data.firstName}</h3>  
         </div>  

         <div className=" justify-between border-b-2 my-4">
             <h1 className="text-md font-bold mb-2">Your Balance ${bal}</h1>
             <h1 className="text-md font-bold mb-2">Users</h1>
              
         </div> 

         <div className="border-b-2">
             <input className="p-2 mb-2.5" type="text" placeholder="Search users..."/>
         </div>
         
         {
          users.map((value)=>{
             if(value._id === data._id)
             return;
            
            return (
              <div className="flex justify-between mt-5" key={value._id}>
            
              <h1 className="text-md font-bold">{value.firstName}</h1>
              <button className="bg-black text-white px-2 rounded-md text-sm" onClick={()=>submitHandler(value)}>Send Money</button>
           </div>
            )
          })
        
          } 
         
          <Modal visible={open} onClose={handleSubmit} receiverData={receiverData}/> 

    </div>

  )
}

export default Dashboard