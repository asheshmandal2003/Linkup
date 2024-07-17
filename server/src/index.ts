import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";
import followersRouter from "./routers/followers";
import profileRouter from "./routers/profile";
import postRouter from "./routers/post";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3001;
const corsConfigs = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfigs));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ limit: "30mb" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", followersRouter);
app.use("/api/v1/user", profileRouter);
app.use("/api/v1/user", postRouter);

app.use("*", (_req: Request, res: Response) => {
  return res.status(404).json({ error: "Page not found!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
