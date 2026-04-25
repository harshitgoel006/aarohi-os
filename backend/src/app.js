import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health check
app.get("/", (req, res) => {
  res.send("Aarohi OS Backend Running 🚀");
});

export default app;