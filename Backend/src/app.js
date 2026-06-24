import express from "express";

import { contactRouter } from "./modules/contacts/contact.module.js";

import {
  errorHandler,
  notFoundHandler,
} from "./shared/middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v1/contacts", contactRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;