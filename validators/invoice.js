import Joi from "joi";

export const addInvoiceValidator = Joi.object({
  invoiceId: Joi.string().required(),
  invoiceDate: Joi.date().required(),
  recipient: Joi.string().required(),
  sender: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        quantity: Joi.number().integer().required(),
        price: Joi.number().required(),
      })
    )

    .required(),
});

// //validators for items with subtotal
// import Joi from "joi";

// export const addInvoiceValidator = Joi.object({
//   invoiceId: Joi.string().required(),
//   invoiceDate: Joi.date().required(),
//   recipient: Joi.string().required(),
//   sender: Joi.string().required(),
//   items: Joi.array()
//     .items(
//       Joi.object({
//         description: Joi.string().required(),
//         quantity: Joi.number().integer().required(),
//         price: Joi.number().min(0).required(),
//       })
//     )

//     .required(),
// });
