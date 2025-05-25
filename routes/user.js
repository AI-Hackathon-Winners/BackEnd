import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../controller/user.js";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);

userRouter.get("/users", getAllUsers);

export default userRouter;
