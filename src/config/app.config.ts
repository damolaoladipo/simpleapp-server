import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'

config()

const app = express()

app.use(helmet() as express.RequestHandler)

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ limit: "50mb" }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {});

app.post("/regsiter", (req: Request, res: Response, next: NextFunction) => {
 console.log(req.body);
});

app.use(errorHandler);

export default app