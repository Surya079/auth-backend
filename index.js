import express from "express";
import env from "dotenv";
import cors from "cors";
import connectDB from "./DB/database.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

env.config();
const app = express();
const port = process.env.PORT;

connectDB();
const corsOptions = {
  origin: "https://auth-frontend-pink.vercel.app/", // Specify your frontend URL
  methods: "GET,POST", // Allow these HTTP methods
  credentials: true,
  allowedHeaders: "Content-Type,Authorization", // Allow headers
};

app.use(cors(corsOptions)); // Enable CORS with options

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
