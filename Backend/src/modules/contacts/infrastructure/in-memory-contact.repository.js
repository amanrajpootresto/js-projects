import { ContactRepository } from "../domain/contact.repository.js";

export class InMemoryContactRepository extends ContactRepository {
  constructor() {
    super();

    this.contacts = [];
  }

  async create(contact) {
    this.contacts.push(contact);

    return contact;
  }

  async findById(id) {
    return (
      this.contacts.find((contact) => contact.id === id) ??
      null
    );
  }

  async findByPhone(phone) {
    const normalizedPhone = this.#normalizePhone(phone);

    return (
      this.contacts.find(
        (contact) => contact.phone === normalizedPhone
      ) ?? null
    );
  }

  async search({ firstName, phone } = {}) {
    let filteredContacts = [...this.contacts];

    if (firstName) {
      const normalizedFirstName = firstName
        .trim()
        .toLowerCase();

      filteredContacts = filteredContacts.filter((contact) =>
        contact.firstName
          .toLowerCase()
          .includes(normalizedFirstName)
      );
    }

    if (phone) {
      const normalizedPhone = this.#normalizePhone(phone);

      filteredContacts = filteredContacts.filter((contact) =>
        contact.phone.includes(normalizedPhone)
      );
    }

    return filteredContacts;
  }

  async update(contact) {
    const contactIndex = this.contacts.findIndex(
      (existingContact) => existingContact.id === contact.id
    );

    if (contactIndex === -1) {
      return null;
    }

    this.contacts[contactIndex] = contact;

    return contact;
  }

  async delete(id) {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === id
    );

    if (contactIndex === -1) {
      return false;
    }

    this.contacts.splice(contactIndex, 1);

    return true;
  }

  #normalizePhone(phone) {
    return String(phone)
      .trim()
      .replace(/[\s()-]/g, "");
  }
}