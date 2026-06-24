import { AppError } from "../../../shared/errors/AppError.js";

export class UpdateContactUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(id, input) {
    if (Object.hasOwn(input, "phone")) {
      throw new AppError(
        "Phone number cannot be changed",
        400
      );
    }

    const contact =
      await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    contact.updateNames({
      firstName: input.firstName,
      lastName: input.lastName,
    });

    return this.contactRepository.update(contact);
  }
}