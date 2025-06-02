import { Router } from "express";
import { summarizeText } from "../controller/ai.js"



const aiRouter = Router();

aiRouter.post('/summarize', summarizeText);



export default aiRouter;
