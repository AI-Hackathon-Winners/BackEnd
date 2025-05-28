import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { countLeads, createLead, deleteLeadById, getAllLeads, getLeadById, updateLeadById } from "../controller/lead.js";



const leadRouter = Router();

leadRouter.post("/leads", createLead);

leadRouter.get("/leads/:id", getLeadById);

leadRouter.get("/leads", getAllLeads);

leadRouter.patch("/leads/:id", updateLeadById);

leadRouter.delete("/leads", isAuthenticated,  deleteLeadById);

leadRouter.get("/leads", isAuthenticated, countLeads)



export default leadRouter;