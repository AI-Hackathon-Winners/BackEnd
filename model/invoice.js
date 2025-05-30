import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const itemSchema = new Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const invoiceSchema = new Schema(
  {
    invoiceId: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    recipient: { type: String, required: true },
    sender: { type: String, required: true },
    items: { type: [itemSchema], required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.plugin(normalize);

export const InvoiceModel = model("Invoice", invoiceSchema);

// //model for item with subtotal

// import { Schema, model } from "mongoose";
// import normalize from "normalize-mongoose";

// const itemSchema = new Schema(
//   {
//     description: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//     total: { type: Number, required: true }, // quantity * price
//   },
//   { _id: false }
// );

// const invoiceSchema = new Schema(
//   {
//     invoiceId: { type: String, required: true, unique: true },
//     invoiceDate: { type: Date, required: true },
//     recipient: { type: String, required: true },
//     sender: { type: String, required: true },
//     items: { type: [itemSchema], required: true },
//     subtotal: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// invoiceSchema.plugin(normalize);

// export const InvoiceModel = model("Invoice", invoiceSchema);
