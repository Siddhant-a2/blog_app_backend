import express from "express";
import authController from "../controllers/auth-controller.js";
import authValidator from "../validators/auth-validator.js";
import validate from "../middlewares/validate-middleware.js";

const router = express.Router();

router.route('/register').post(validate(authValidator.signupSchema),authController.register);

router.route('/login').post(validate(authValidator.loginSchema),authController.login);

export default router;
