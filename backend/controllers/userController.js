const {User, Account} = require('../db');
const zod = require('zod');
const jwt = require('jsonwebtoken')
const secret = require('../config')
const signinBody = zod.object({
      username: zod.string().email(),
      firstName: zod.string(),
	  lastName: zod.string(),
      password: zod.string()
})

const loginBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const sign_up_controller = async (req,res)=>{

     const { success} = signinBody.safeParse(req.body);
     if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }
    
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
   
    try{
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
       console.log("User created", user);

    await Account.create({
        userId: user._id,
        balance: 10000
    })
       
    return res.status(200).json({
        user: user,
        
    })
     
    }catch(err){
        return res.status(500).json({
            message: "Error occured while creating user and account"
        });
    }     
}


const sign_in_controller = async (req,res)=>{
    const { success} = loginBody.safeParse(req.body);
     if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    })

    if(!user){
        return res.send("No such existing user");
    }

    if(user.password !== req.body.password){
        return res.status(411).json({
            message: "Incorret Password"
        })
    }
    
    

    const token = jwt.sign({
        email: user.username,
        userId: user._id
    },
    secret.JWT_SECRET,
    {expiresIn: "1h"}
    
    )
    
    return res.status(200).json({
        message: "Login Successfull",
        user: user,
        token: token
    })

}

const get_All_Users = async (req, res)=>{
    
     try{
      const users = await User.find();
      //console.log(users);
      return res.status(200).json(
          users
      )
     }catch(error){
      console.log(error);
      return res.send(error);
     }


}


module.exports = {sign_up_controller, sign_in_controller, get_All_Users}