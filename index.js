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
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
