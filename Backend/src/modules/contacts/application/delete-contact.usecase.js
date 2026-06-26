import { AppError, ERROR_CODES } from "../../../shared/errors/AppError.js";

export class DeleteContactUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(id) {
    const deleted =
      await this.contactRepository.delete(id);

    if (!deleted) {
      throw new AppError(
        "Contact not found",
        404,
        ERROR_CODES.CONTACT_NOT_FOUND
      );
    }

    return {
      id,
      deleted: true,
    };
  }
}