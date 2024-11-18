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
    amount: { type: Number, required: true },
    category: { type: String, required: true }, 
    date: { type: Date, required: true },
    time: { type: String, default: () => new Date().toLocaleTimeString() },
    description: { type: String },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit card", "bank transfer", "mobile payment"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
    currency: { type: String, default: "NGN" },
    reference: { type: String, unique: true, required: true }
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


transactionSchema.pre("save", function (next) {
  if (!this.reference) {
    this.reference = `txn_${Date.now()}`;
  }
  next();
});

const Transaction: Model<ITransactionDoc> = model<ITransactionDoc>(
    "Transaction",
    transactionSchema
  );
  
export default Transaction;