import "dotenv/config";
import connectDB from "./config/dbConfig.js";
import app from "./app.js"
//--------------------------------------------------------------------------------

connectDB();
//--------------------------------------------------------------------------------
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Eduction app lisning port : ${port}`)
})
