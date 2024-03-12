const express = require("express");
const {get_bal, money_transer} = require("../controllers/accountController");
const accountRouter = express.Router();
const authMiddleware  = require('../middleware/auth_middleware')
accountRouter.get('/bal', authMiddleware,get_bal);
accountRouter.post('/trans', authMiddleware,money_transer );
module.exports = accountRouter;