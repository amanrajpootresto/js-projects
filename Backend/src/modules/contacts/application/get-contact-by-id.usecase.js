import { AppError, ERROR_CODES } from "../../../shared/errors/AppError.js";

export class GetContactByIdUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(id) {
    const contact =
      await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError(
        "Contact not found",
        404,
        ERROR_CODES.CONTACT_NOT_FOUND
      );
    }

    return contact;
  }
}