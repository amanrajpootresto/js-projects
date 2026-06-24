export class SearchContactsUseCase {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute({ firstName, phone } = {}) {
    return this.contactRepository.search({
      firstName,
      phone,
    });
  }
}