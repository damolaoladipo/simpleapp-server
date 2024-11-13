import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import errorHandler from "../middlewares/error.mdw";
import helmet from "helmet";
import { ENVType } from "../utils/enum.utils";
import ENV from "../utils/env.utils";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import expressSanitize from "express-mongo-sanitize";
import { limitRequests } from "../middlewares/ratelimit.mdw";

config()

const app = express()

app.use(cookieParser());

if (ENV.isStaging() || ENV.isDev()) {
    app.use(morgan("dev"));
  }
  

app.use(expressSanitize());

app.use(helmet() as express.RequestHandler)

app.use(limitRequests);

app.use(cors({ origin: true, credentials: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Origin",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Origin",
      "x-acess-token, origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  

app.use(express.json({ limit: "50mb" }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  
    let environment = ENVType.DEVELOPMENT
  
    if (ENV.isProduction()) {
      environment = ENVType.PRODUCTION;
    } else if (ENV.isStaging()) {
      environment = ENVType.STAGING
    } else if (ENV.isDev()) {
      environment = ENVType.DEVELOPMENT
    }
  
    res.status(200).json({
      error: false,
      errors: [],
      data: { name: "SimpleApp API", 
        version: "1.0.0" 
      },
      message: 'SimpleApp api v1.0.0 is healthy',
      status: 200,
    });
  });
  

app.use(errorHandler);

export default app