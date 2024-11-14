import app from "./config/app.config";
import colors from "colors";
import connectDB from "./config/db.config";
import seedData from "./config/seeds/seeder.seed";
import { setupCleanupJob } from "./cron-jobs/tmp-cleanup";
import path from "path";



const connect = async () : Promise<void> => {

    await connectDB()
    await seedData()
    setupCleanupJob(path.join(__dirname, "config", "tmp"));
}
connect()


const PORT = process.env.PORT || 5003;
 

const server = app.listen(PORT, () => {
    console.log(colors.bold.yellow (`SimpleApp Server running in ${process.env.NODE_ENV} mode`)) ;
})

process.on('unhandledRejection', (err:any, promise) => {
    console.log(colors.bold.red(`Error: ${err.message}`))
    server.close(() => process.exit(1))
})