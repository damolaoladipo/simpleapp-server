import {Request, Response, NextFunction } from "express";
import ENV from "../utils/env.utils";
import ErrorResponse from "../utils/error.utils";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let message: string = ""
    let errors: Array<any> = []
    let error = { ...err }

    if (err.errors) {
        errors = Object.values(err.errors).map((el: any, i) => {
            let result: any;
            if (el.properties) {
                result = el.properties.message
            } else {
                result = el
            }
            return result;
        })
    }

    if (ENV.isDev() || ENV.isStaging()) {
        console.log("ERR: ", err);
    }

    if (err.name === "CastError") {
        message = "Resource not found = id cannot be casted";
        error = new ErrorResponse(message, 500, errors);
    }

    if (err.code === 11000) {
        message = "Duplicate field value entered";
        error = new ErrorResponse(message, 500, errors);
    }

    if (err.code === "ValidationError") {
        message = "An error occured";
        error = new ErrorResponse(message, 500, errors);
    }

    if (err.code === "ReferenceError") {
        message = "Something is not right - check reference";
        error = new ErrorResponse(message, 500, errors);
    }

    res.status(500).json({
        error: true,
        errors: error.errors ? error.errors : [],
        data: error.data ? error.data : {},
        message: error.message ? error.message : "Error",
        status: error.status ? error.status : 500
    })
}

export default errorHandler;