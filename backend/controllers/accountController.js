const { error } = require('console');
const {User , Account} = require('../db');
//const auth_middleware = require('../middleware/auth_middleware');
const mongoose = require('mongoose');

const get_bal = async (req,res)=>{
   console.log(req.token.userId);
   const id = req.token.userId;

   const account = await Account.findOne({
      userId: id
   })

   if(!account){
     return res.status(404).json({
        message: "No such Account Exists"
     })
   }
   console.log(account);
   return res.status(200).json({
      balance: account.balance
   });

}

const money_transer = async (req,res)=>{
     const session = await mongoose.startSession();
     session.startTransaction();
     const {rec_acc_id , amount} = req.body;
     console.log('reciever_id', rec_acc_id);
     console.log('sender_id', req.token.userId)
     

     const sender_account = await Account.findOne({
        userId: req.token.userId
     }).session(session);

     if(!sender_account || sender_account.balance < amount){
        await session.abortTransaction();
        return res.status(404).json({
            "message": "Not sufficient Balance"
        })
     }

     const rec_account = await Account.findOne({
        userId: rec_acc_id
     }).session(session);

     if(!rec_account){
        await session.abortTransaction();
        return res.status(404).json({
            "message":"Receiver Account Not Found"
        })
     }

     // Perform the transfer
    await Account.updateOne({ userId: req.token.userId }, { $inc: { balance: -amount } }).session(session);
    
    await Account.updateOne({ userId: rec_acc_id }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
 

    
}

module.exports = {get_bal, money_transer};