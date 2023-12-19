const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json()); //to accept json data
app.get("/", (req, res) => {
  res.send("API IS RUNNING FINE!!");
});
app.use("/api/user", userRoutes);

const PORT = process.env.PORT_NUMBER || 5000;

const server = app.listen(5000, console.log(`Server Started on port ${PORT}`));
