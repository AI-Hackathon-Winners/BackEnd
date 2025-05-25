import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { getProfile, loginUser, registerUser, updateProfile } from "../controller/user.js";

const userRouter = Router();

userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, hasPermission("get_profile"), getProfile);

userRouter.patch("/users/me", isAuthenticated, hasPermission("update_profile"), updateProfile)


// export Router
export default userRouter;
