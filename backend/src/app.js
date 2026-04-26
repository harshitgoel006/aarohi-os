// This module sets up the Express application for the server, configuring middleware for CORS, JSON parsing, URL encoding, static file serving, and cookie parsing. It also imports and declares various routes for handling different aspects of the application such as uploads, users, products, categories, carts, wishlists, orders, notifications, reviews, and payments. The configured Express app is then exported for use in other parts of the server application.

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configuring middleware for CORS, JSON parsing, URL encoding, static file serving, and cookie parsing. The CORS configuration allows requests from the specified origin and includes credentials (like cookies) in cross-origin requests. The JSON and URL-encoded parsers are set with a limit of 16kb to prevent excessively large payloads. Static files are served from the 'public' directory, and cookie parsing is enabled to handle cookies in incoming requests.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";


app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

export default app;