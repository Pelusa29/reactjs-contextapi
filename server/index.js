

//#region Imports
import { connectDB } from './config/db.js'
import { PORT } from './config/enviroments.js'
import app from './app.js'
//#endregion

//#Executing
connectDB()

// Start the server on the specified port
app.listen(PORT)
console.log('Server is running on port', PORT)