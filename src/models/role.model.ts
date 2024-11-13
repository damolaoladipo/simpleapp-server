import mongoose, { Schema, Types, Model } from "mongoose";
import { IRoleDoc } from "../utils/interface.util";
import slugify from "slugify";

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "role already exists with this name"],
      default: "",
    },
    description: {
      type: String,
      maxLength: 200,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
RolesSchema.set("toJSON", { virtuals: true, getters: true });
RolesSchema.pre<IRoleDoc>("save", async function (next) {
  this.slug = slugify(this.name, { lower: true, replacement: "-" });
  next();
});
RolesSchema.pre<IRoleDoc>("insertMany", async function (next) {
  this.slug = slugify(this.name, { lower: true, replacement: "-" });
  next();
});
RolesSchema.methods.getAll = async function () {
  return Role.find({});
};
RolesSchema.statics.findByName = async function (name: string) {
  const role = Role.findOne({ name });
  return role ?? null;
};

const Role: Model<IRoleDoc> = mongoose.model<IRoleDoc>("Role", RolesSchema);

export default Role;
