import { Schema, model, Document } from "mongoose";
import { IReportDoc } from "../utils/interface.util";

const ReportSchema = new Schema<IReportDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "resolved", "rejected"], 
      default: "pending" 
    },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Report = model<IReportDoc>("Report", ReportSchema);

export default Report;
