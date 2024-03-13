import axios from "axios";

type modalProps = {
    visible: boolean,
    onClose: ()=>void,
    receiverData: any
}
const Modal = ({visible , onClose, receiverData}: modalProps) => {
    
 if(!visible)
  return null;
  
  const closeModel = (e:any)=>{
    const val = (e.target?.id=== "outer_div");
    if(val === true)
    onClose();
  }

  const funCheckout = async (e:any)=>{
    e.preventDefault();
    console.log('receiver', receiverData);
    const amount = e.target.amount.value;

    try{

        const postData = {
            rec_acc_id: receiverData._id,
            amount: amount
        }
        const token = localStorage.getItem('token');

       const response = await axios.post("http://localhost:8000/api/v1/account/trans", postData,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
       })
       console.log('Checkout', response);
       onClose();
    }catch(error){
     console.log(error);

    }

  }
  return (
    <div className="m-0 p-0 bg-slate-300 fixed top-0 left-0  h-screen w-full flex justify-center items-center" id="outer_div" onClick={closeModel}>
           
           <div className="bg-stone-50  max-w-md w-2/4 flex justify-center  flex-col p-4">
                 <h1 className="text-3xl font-bold p-7 m-auto"> Send Money</h1>
                 <h4 className="text-xl  font-bold">Friend's Name</h4>
                 <p className="text-sm  font-bold mb-3">Amount (in $)</p>
                 <form action="" className="w-full" onSubmit={funCheckout}>
                     <input className="border-2 border-black rounded-md w-full " type="text" placeholder="Enter amount" name="amount" required/>
                     <div className=" text-center bg-green-500 my-4  rounded-md ">
                        <button className=" " type="submit">Initiate Transfer</button>
                     </div>
                 </form>
           </div>
 
    </div>
  )
}

export default Modal