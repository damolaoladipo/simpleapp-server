import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/async.mdw";
import ErrorResponse from "../utils/error.util";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const checkAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization")?.split("")[1];

    if (!token) {
      return next(new ErrorResponse("No token provided", 401, [],));
    }

    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      req.user = data; 
      next();
    } catch (error) {

      if (error instanceof jwt.TokenExpiredError) {
        return next(new ErrorResponse("Token has expired", 400, []));
      } else if (error instanceof jwt.JsonWebTokenError) {
        return next(new ErrorResponse("Invalid Token", 401, []));
      } else {
        return next(new ErrorResponse("Something went wrong", 500, []));
      }
    }
  }
);

export default checkAuth;
