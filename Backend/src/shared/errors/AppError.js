export const ERROR_CODES = Object.freeze({
  AUTH_PASSWORD_REQUIRED: "AUTH_PASSWORD_REQUIRED",

  CONTACT_DUPLICATE_PHONE: "CONTACT_DUPLICATE_PHONE",
  CONTACT_NOT_FOUND: "CONTACT_NOT_FOUND",
  CONTACT_PHONE_IMMUTABLE: "CONTACT_PHONE_IMMUTABLE",
  CONTACT_UPDATE_NO_FIELDS: "CONTACT_UPDATE_NO_FIELDS",
  CONTACT_FIRST_NAME_REQUIRED: "CONTACT_FIRST_NAME_REQUIRED",
  CONTACT_FIRST_NAME_TOO_LONG: "CONTACT_FIRST_NAME_TOO_LONG",
  CONTACT_LAST_NAME_MUST_BE_STRING: "CONTACT_LAST_NAME_MUST_BE_STRING",
  CONTACT_LAST_NAME_TOO_LONG: "CONTACT_LAST_NAME_TOO_LONG",
  CONTACT_PHONE_REQUIRED: "CONTACT_PHONE_REQUIRED",
  CONTACT_PHONE_INVALID: "CONTACT_PHONE_INVALID",
});

export class AppError extends Error {
  constructor(
    message,
    statusCode = 500,
    errorCode = "APP_ERROR",
    severity = "error"
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
    this.message = message;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
    this.severity = severity;

    Error.captureStackTrace(this, this.constructor);
  }
}