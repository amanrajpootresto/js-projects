import { Contact } from "../domain/contact.entity.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class CreateContactUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(input) {
    const contact = new Contact({
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
    });

    const existingContact =
      await this.contactRepository.findByPhone(
        contact.phone
      );

    if (existingContact) {
      throw new AppError(
        "A contact with this phone number already exists",
        409
      );
    }

    return this.contactRepository.create(contact);
  }
}