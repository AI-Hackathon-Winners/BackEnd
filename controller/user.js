import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/user.js";
import { UserModel } from "../model/user.js";
import { sendEmail } from "../utils/mailing.js";

export const registerUser = async (req, res, next) => {
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    return res.status(409).json("user already exists");
  }

  const hashedPassword = bcrypt.hashSync(value.password, 10);

  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });

  const sendWelcomeEmail = await sendEmail(
    result.email,
    "WELCOME TO SMART CRM!",
    `<!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            overflow: hidden;
          }
          .header {
            background: rgb(39, 133, 211);
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 28px;
          }
          .body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
            font-size: 18px;
          }
          .button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 20px;
            background-color: rgb(39, 133, 211);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            text-align: center;
          }
          .footer {
            text-align: center;
            background: #eeeeee;
            padding: 10px;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            SAMRT CRM
          </div>
          <div class="body">
            <p>Hello ${result.username},</p>
            <p>We're thrilled to have you join our community! </p>
            <p>Your journey into the world of CRM starts now. </p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <a href="" class="button">Login to Your Account</a>
          </div>
          <div class="footer">
            © 2025 SMART_CRM All Rights Reserved.
          </div>
        </div>
      </body>
    </html>`
  );
  console.log(sendWelcomeEmail);

  res.status(201).json("user registered successfully");
};

export const loginUser = async (req, res, next) => {
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (!user) {
    return res.status(404).json("user does not exists");
  }

  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("invalid credentials");
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({ accessToken, id: user.id });
};

export const getAllUsers = async (req, res) => {
  const allUsers = await UserModel.find({});
  res.status(200).json({ data: allUsers });
};
