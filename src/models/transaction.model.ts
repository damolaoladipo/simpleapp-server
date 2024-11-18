import mongoose, { Model, Schema } from "mongoose";
import { ITransactionDoc } from "../utils/interface.util";
import { model } from "mongoose";

const transactionSchema = new Schema<ITransactionDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    description: { type: String },
    amount: { type: Number, required: true },
    category: { type: String, }, 
    paymentMethod: {
      type: String,
      enum: ["cash", "credit card", "bank transfer", "mobile payment"],
      default: "bank transfer",
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
    currency: { type: String, default: "NGN" },
  },
  { 
    timestamps: true,
    versionKey: "_version",
    toJSON: {
      transform(doc: any, ret) {
        ret.id = ret._id;
      },
    },
   }
);

const Transaction: Model<ITransactionDoc> = model<ITransactionDoc>(
    "Transaction",
    transactionSchema
  );
  
export default Transaction;