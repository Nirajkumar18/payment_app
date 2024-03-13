const express = require("express");

const userRouter = express.Router();
const {sign_up_controller, sign_in_controller, get_All_Users} = require('../controllers/userController')
const authMiddleware = require('../middleware/auth_middleware');
userRouter.post('/signup', sign_up_controller);
userRouter.post('/login', sign_in_controller);
userRouter.get('/info', authMiddleware, get_All_Users);
module.exports = userRouter;