import { AppError, ERROR_CODES } from "../../../shared/errors/AppError.js";

export class UpdateContactUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(id, input) {
    if (Object.hasOwn(input, "phone")) {
      throw new AppError(
        "Phone number cannot be changed",
        400,
        ERROR_CODES.CONTACT_PHONE_IMMUTABLE
      );
    }

    const contact =
      await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError(
        "Contact not found",
        404,
        ERROR_CODES.CONTACT_NOT_FOUND
      );
    }

    contact.updateNames({
      firstName: input.firstName,
      lastName: input.lastName,
    });

    return this.contactRepository.update(contact);
  }
}