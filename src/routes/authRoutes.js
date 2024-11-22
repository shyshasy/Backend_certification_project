import express from "express";
import { login, getUser } from "../controllers/authController.js";
import { requestPasswordReset, resetPassword} from "../api/forgetPassword.js";
// import {
//   registerValidator,
//   loginValidator,
// } from "../validators/authValidator.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/auth/register", registerValidator, register);
router.post("/auth/login", login);
router.post("/forget", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.get("/auth/user", authenticateToken, getUser);

export default router;
