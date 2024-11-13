import mongoose, { ConnectOptions } from "mongoose";
import colors from "colors";
import { ENVType } from "../utils/enum.utils";

const options: ConnectOptions = {
  autoIndex: true,
  wtimeoutMS: 60000,
  maxPoolSize: 1000,
  connectTimeoutMS: 6000,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
  family: 4,
};

const connectDB = async () => {
  if (
    process.env.NODE_ENV === ENVType.DEVELOPMENT ||
    process.env.NODE_ENW === ENVType.PRODUCTION
  ) {
    try {
      const dbConn = await mongoose.connect(
        process.env.MONGODB_URI || "",
        options
      );
      console.log(
        colors.cyan.bold.underline(
          `SimpleApp Database Connected: ${dbConn.connection.host}`
        )
      );
    } catch (error) {
      console.log(
        colors.cyan.bold.underline(`Could not connect to SimpleApp database: ${error}`)
      );
    }
  }
};

export default connectDB;
