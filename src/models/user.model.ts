import mongoose, { model, Schema, Types } from "mongoose";
import {IUserDoc } from "../utils/interface.util";
import slugify from "slugify";
import bcrypt, { genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";


const UserSchema = new Schema<IUserDoc>({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [6, "username cannot be more than 6 characters"],
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  badges: {
    type: String,
    default: ""
  },

  achievement: {
    type: String,
    default: "",
  },

  savedPassword: String,
  passwordType: String,
  userType: String,

  activationToken: String,
  activationTokenExpire: Date,

  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  roles: [
    {
      type: Schema.Types.Mixed,
      ref: "Role",
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
});

UserSchema.set("toJSON", { virtuals: true, getters: true });

UserSchema.pre<IUserDoc>("save", async function (next) {
  
  if (this.isModified("password")) {
    const salt = await genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  this.slug = slugify(this.email, { lower: true, replacement: "-" });
  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  let result: boolean = false;

  if (this.password && this.password !== "") {
    result = await bcrypt.compare(password, this.password);
  }
  return result;
};


UserSchema.methods.getAuthToken = async function () {
  const secret = process.env.JWT_ACCESS_SECRET;
  const expire = process.env.JWT_ACCESS_EXPIRY;
  let token: string = "";

  if (secret) {
    token = jwt.sign(
      { id: this._id, 
        email: this.email, 
        roles: this.roles 
      },
      secret,
      {
        algorithm: "HS512",
        expiresIn: expire,
      }
    );
  }
  return token;
};



UserSchema.statics.getUsers = async () => {
  return await User.find({});
};

UserSchema.methods.getRefreshToken = async function () {
  const secret = process.env.JWT_REFRESH_SECRET;
  const expire = process.env.JWT_REFRESH_EXPIRY;
  let token: string = "";
  let payload = {
    id: this._id,
    email: this.email,
  };
  if (secret) {
    token = await jwt.sign(payload, secret, {
      algorithm: "HS512",
      expiresIn: expire,
    });
  }

  return token;
};

UserSchema.statics.getUsers = async () => {
  return await User.find({});
};

UserSchema.methods.findById = async (id: any) => {
  const user = await User.findOne({ _id: id });
  return User ? User : null;
};

const User = mongoose.model<IUserDoc>("user", UserSchema);

export default User;
