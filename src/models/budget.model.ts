import { Schema, model, Document } from "mongoose";
import { IBudgetDoc } from "../utils/interface.util";

const BudgetSchema = new Schema<IBudgetDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    tags: { type: [String] },
  },
  { timestamps: true }
);

const Budget = model<IBudgetDoc>("Budget", BudgetSchema);

export default Budget;
