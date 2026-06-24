import { AppError } from "../../../shared/errors/AppError.js";

export class DeleteContactUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(id) {
    const deleted =
      await this.contactRepository.delete(id);

    if (!deleted) {
      throw new AppError("Contact not found", 404);
    }

    return {
      id,
      deleted: true,
    };
  }
}