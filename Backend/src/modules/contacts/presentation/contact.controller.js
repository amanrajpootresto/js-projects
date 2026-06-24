export class ContactController {
  constructor({
    createContactUseCase,
    getContactByIdUseCase,
    searchContactsUseCase,
    updateContactUseCase,
    deleteContactUseCase,
  }) {
    this.createContactUseCase = createContactUseCase;
    this.getContactByIdUseCase = getContactByIdUseCase;
    this.searchContactsUseCase = searchContactsUseCase;
    this.updateContactUseCase = updateContactUseCase;
    this.deleteContactUseCase = deleteContactUseCase;
  }

  create = async (req, res, next) => {
    try {
      const contact =
        await this.createContactUseCase.execute({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
        });

      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const contact =
        await this.getContactByIdUseCase.execute(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  };

  search = async (req, res, next) => {
    try {
      const contacts =
        await this.searchContactsUseCase.execute({
          firstName: req.query.firstName,
          phone: req.query.phone,
        });

      res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const contact =
        await this.updateContactUseCase.execute(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result =
        await this.deleteContactUseCase.execute(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}