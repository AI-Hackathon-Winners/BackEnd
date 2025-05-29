import { Router } from "express";
import {
  addInvoice,
  deleteInvoice,
  downloadInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
  updatePartofInvoice,
} from "../controller/invoice.js";

const invoiceRouter = Router();

invoiceRouter.post("/invoices", addInvoice);

invoiceRouter.get("/invoices/:id", getInvoice);

invoiceRouter.get("/invoices", getAllInvoices);

invoiceRouter.put("/invoices/:id", updateInvoice);

invoiceRouter.delete("/invoices/:id", deleteInvoice);

invoiceRouter.patch("/invoice/:id", updatePartofInvoice);

invoiceRouter.get("/invoices/download/:id", downloadInvoice);

export default invoiceRouter;
