import { AppError } from "../errors/AppError.js";

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorCode: error.errorCode,
      severity: error.severity,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}