import { InMemoryContactRepository } from "./infrastructure/in-memory-contact.repository.js";

import { CreateContactUseCase } from "./application/create-contact.usecase.js";
import { GetContactByIdUseCase } from "./application/get-contact-by-id.usecase.js";
import { SearchContactsUseCase } from "./application/search-contacts.usecase.js";
import { UpdateContactUseCase } from "./application/update-contact.usecase.js";
import { DeleteContactUseCase } from "./application/delete-contact.usecase.js";

import { ContactController } from "./presentation/contact.controller.js";
import { createContactRouter } from "./presentation/contact.routes.js";

const contactRepository =
  new InMemoryContactRepository();

const createContactUseCase =
  new CreateContactUseCase(contactRepository);

const getContactByIdUseCase =
  new GetContactByIdUseCase(contactRepository);

const searchContactsUseCase =
  new SearchContactsUseCase(contactRepository);

const updateContactUseCase =
  new UpdateContactUseCase(contactRepository);

const deleteContactUseCase =
  new DeleteContactUseCase(contactRepository);

const contactController = new ContactController({
  createContactUseCase,
  getContactByIdUseCase,
  searchContactsUseCase,
  updateContactUseCase,
  deleteContactUseCase,
});

export const contactRouter =
  createContactRouter(contactController);