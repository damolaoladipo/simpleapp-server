import app from "./config/app.config";
import colors from "colors";


const connect = async () : Promise<void> => {

    
}
connect()


const PORT = process.env.PORT || 5001;
 

const server = app.listen(PORT, () => {
    console.log(colors.bold.yellow (`SimpleApp Server running in ${process.env.NODE_ENV} mode`)) ;
})

process.on('unhandledRejection', (err:any, promise) => {
    console.log(colors.bold.red(`Error: ${err.message}`))
    server.close(() => process.exit(1))
})