import { Schema, model, Document } from "mongoose";
import { IAchievementDoc } from "../utils/interface.util";

const AchievementSchema = new Schema<IAchievementDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    tags: { type: [String] },
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

const Achievement = model<IAchievementDoc>("Achievement", AchievementSchema);

export default Achievement;
