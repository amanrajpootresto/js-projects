import { randomUUID } from "node:crypto";
import { AppError, ERROR_CODES } from "../../../shared/errors/AppError.js";

export class Contact {
  #phone;

  constructor({
    id = randomUUID(),
    firstName,
    lastName = null,
    phone,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.firstName = this.#validateFirstName(firstName);
    this.lastName = this.#validateLastName(lastName);
    this.#phone = this.#validatePhone(phone);
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  get phone() {
    return this.#phone;
  }

  updateNames({ firstName, lastName }) {
    let valueChanged = false;

    if (firstName !== undefined) {
      this.firstName = this.#validateFirstName(firstName);
      valueChanged = true;
    }

    if (lastName !== undefined) {
      this.lastName = this.#validateLastName(lastName);
      valueChanged = true;
    }

    if (!valueChanged) {
      throw new AppError(
        "Provide firstName or lastName to update",
        400,
        ERROR_CODES.CONTACT_UPDATE_NO_FIELDS
      );
    }

    this.updatedAt = new Date();
  }

  #validateFirstName(firstName) {
    if (typeof firstName !== "string" || !firstName.trim()) {
      throw new AppError(
        "First name is required",
        400,
        ERROR_CODES.CONTACT_FIRST_NAME_REQUIRED
      );
    }

    const normalizedFirstName = firstName.trim();

    if (normalizedFirstName.length > 50) {
      throw new AppError(
        "First name cannot exceed 50 characters",
        400,
        ERROR_CODES.CONTACT_FIRST_NAME_TOO_LONG
      );
    }

    return normalizedFirstName;
  }

  #validateLastName(lastName) {
    if (
      lastName === undefined ||
      lastName === null ||
      lastName === ""
    ) {
      return null;
    }

    if (typeof lastName !== "string") {
      throw new AppError(
        "Last name must be a string",
        400,
        ERROR_CODES.CONTACT_LAST_NAME_MUST_BE_STRING
      );
    }

    const normalizedLastName = lastName.trim();

    if (normalizedLastName.length > 50) {
      throw new AppError(
        "Last name cannot exceed 50 characters",
        400,
        ERROR_CODES.CONTACT_LAST_NAME_TOO_LONG
      );
    }

    return normalizedLastName || null;
  }

  #validatePhone(phone) {
    if (typeof phone !== "string" || !phone.trim()) {
      throw new AppError(
        "Phone number is required",
        400,
        ERROR_CODES.CONTACT_PHONE_REQUIRED
      );
    }

    const normalizedPhone = phone
      .trim()
      .replace(/[\s()-]/g, "");

    const validPhonePattern = /^\+?\d{7,15}$/;

    if (!validPhonePattern.test(normalizedPhone)) {
      throw new AppError(
        "Phone number must contain 7 to 15 digits",
        400,
        ERROR_CODES.CONTACT_PHONE_INVALID
      );
    }

    return normalizedPhone;
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}