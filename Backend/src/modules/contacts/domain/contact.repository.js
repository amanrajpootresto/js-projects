export class ContactRepository {
  async create(contact) {
    throw new Error("create() must be implemented");
  }

  async findById(id) {
    throw new Error("findById() must be implemented");
  }

  async findByPhone(phone) {
    throw new Error("findByPhone() must be implemented");
  }

  async search(filters) {
    throw new Error("search() must be implemented");
  }

  async update(contact) {
    throw new Error("update() must be implemented");
  }

  async delete(id) {
    throw new Error("delete() must be implemented");
  }
}