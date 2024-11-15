import { Router } from "express";
import transactionRoutes from "./routers/transaction.router";

const v1Routes = Router();

v1Routes.use("/api/transactions", transactionRoutes);

export default v1Routes;