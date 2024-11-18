import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken"
import asyncHandler from "../middlewares/async.mdw";
import { UserType } from "../utils/enum.util";
import ErrorResponse from "../utils/error.util";
import User from "../models/user.model";
import AuthService from "../services/auth.service";
import { IRegister, IUserDoc } from "../utils/interface.util";
import userService from "../services/user.service";
import sgMail from '@sendgrid/mail';


/**
 * @name register
 * @description Registers a new user for the application
 * @route POST /auth/register
 * @access  Public
 */
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, displayName, email, password} = req.body as IRegister;

    const validate = await AuthService.validateRegister(req.body);

    if (validate.error) {
      return next(
        new ErrorResponse("Error", validate.code!, [validate.message])
      );
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return next(
        new ErrorResponse("Error", 403, [
          "user already exists, use another email",
        ])
      );
    }

    const user: IUserDoc = await userService.createUser({
        username: username, 
        displayName: displayName, 
        email: email,
        password: password,
        userType: UserType.USER,
    });

  

    res.status(200).json({
      error: false,
      errors: [],
      data: user,
      message:
        "User registered successfully. Please check your email to activate your account.",
      status: 200,
    });
  }
);


/**
 * @name login
 * @description logs a user in
 * @route POST /auth/login
 * @access  Public
 */
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const validate = await AuthService.validateLogin(req.body);

    if (validate.error) {
      return next(
        new ErrorResponse("Error", validate.code!, [validate.message])
      );
    }

    const {userId} = validate.data

    const authToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET || 'defaultSecret', { expiresIn: '2h' })

    res.status(200).json({
      error: false,
      errors: [],
      data: { authToken: validate.data.authToken },
      message: "User login successfull",
      status: 200,
    });
  }
);


/**
 * @name forgotPassword
 * @description Allows user request to a link to reset their password
 * @route POST /auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '15m',
    });

    
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    await user.save();

  
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;


    const message = {
      to: user.email,
      from: process.env.EMAIL_SENDER as string,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
    };

    // Send the email using SendGrid (uncomment if SendGrid is configured)
    // await sgMail.send(message);

    res.status(200).json({
      error: false,
      errors: [],
      data: {},
      message: 'Password reset link sent to email',
      status: 200,
    });
  }
);


/**
 * @name resetPassword
 * @description Allows user reset their password using link provided via the forgot-password route
 * @route POST /auth/reset-password
 * @access  Public
 */
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, id } = req.query; 
    const { newPassword } = req.body;

    
    const hashedToken = crypto
      .createHash("sha256")
      .update(token as string)
      .digest("hex");

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpire: { $gt: Date.now() }, 
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }

    user.password = newPassword;
    user.resetPasswordTokenExpire = new Date();
    await user.save();

    res.status(200).json({
      error: false,
      errors: [],
      data: {},
      message: "Password reset successfully",
      status: 200,
    });
  }
);


/**
 * @name logout
 * @description logs a user out
 * @route POST /auth/logout
 * @access  Public
 */
export const logout = (req: Request, res: Response) => {
  res.status(200).json({ error: false, message: 'Logout successful' });
};


/**
 * @name profile
 * @description Fetches the profile details of the authenticated user.
 * @route GET /api/auth/profile
 * @access Private
 */
export const profile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user: IUserDoc | null = await User.findById(req.user._id);
  if (!user) return next(new ErrorResponse('User not found', 404, []));

  res.status(200).json({ error: false, data: { username: user.username, email: user.email } });
});