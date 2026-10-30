import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: config.frontendOrigin }));
app.use(express.json({ limit: "100kb" }));

app.get("/", (_req, res) => {
  res.json({ status: "success", message: "QueueLess backend API" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "success", message: "QueueLess API is running" });
});

// Unmatched requests also receive JSON instead of Express's default HTML.
app.use((_req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Error middleware must come after all routes and other middleware.
app.use(errorHandler);
