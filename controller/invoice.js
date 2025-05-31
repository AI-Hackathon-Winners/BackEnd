import { InvoiceModel } from "../model/invoice.js";
import { addInvoiceValidator } from "../validators/invoice.js";
import PDFDocument from "pdfkit";

export const addInvoice = async (req, res) => {
  const { error, value } = addInvoiceValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const total = value.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    const newInvoice = new InvoiceModel({
      ...value,
      total: parseFloat(total.toFixed(2)),
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save invoice." });
  }
};

// // invoice with the subtotal for individual items
// export const addInvoice = async (req, res) => {
//   const { error, value } = addInvoiceValidator.validate(req.body);

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   try {
//     const itemsWithTotals = value.items.map((item) => ({
//       ...item,
//       total: parseFloat((item.quantity * item.price).toFixed(2)),
//     }));

//     const subtotal = itemsWithTotals.reduce((sum, item) => sum + item.total, 0);

//     const newInvoice = new InvoiceModel({
//       ...value,
//       items: itemsWithTotals,
//       subtotal: parseFloat(subtotal.toFixed(2)),
//     });

//     await newInvoice.save();
//     res.status(201).json(newInvoice);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to save invoice." });
//   }
// };

export const getAllInvoices = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    let parsedFilter, parsedSort;
    try {
      parsedFilter = JSON.parse(filter);
      parsedSort = JSON.parse(sort);
    } catch (parseError) {
      return res
        .status(400)
        .json({ error: "Invalid filter or sort query parameters." });
    }

    const result = await InvoiceModel.find(parsedFilter).sort(parsedSort);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req, res) => {
  const oneInvoice = await InvoiceModel.findById(req.params.id);
  res.status(200).json({ invoice: oneInvoice });
};

export const updateInvoice = async (req, res, next) => {
  try {
    const result = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ invoice: result });
  } catch (error) {
    next(error);
  }
};

export const updatePartofInvoice = async (req, res, next) => {
  try {
    const result = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req, res) => {
  const deleteInvoiceById = await InvoiceModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send("deleted invoice successfully");
};

export const downloadInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await InvoiceModel.findById(invoiceId).lean({
      virtuals: true,
    });

    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${invoiceId}.pdf`
    );

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(20).text("Invoice", { align: "center" }).moveDown();
    doc.fontSize(14).text(`Item: ${invoice.item}`);
    doc.text(`Description: ${invoice.description}`);
    doc.text(`Quantity: ${invoice.quantity}`);
    doc.text(`Unit Price: $${invoice.unitPrice.toFixed(2)}`);
    doc.text(`Total: $${(invoice.quantity * invoice.unitPrice).toFixed(2)}`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
