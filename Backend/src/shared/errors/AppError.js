export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
    this.message = message;
    this.errorCode = errorCode || "APP_ERROR";
    this.timestamp = new Date().toISOString();
    this.severity = severity || "error";

    Error.captureStackTrace(this, this.constructor);

    // isReplayableError(this);
  }
}