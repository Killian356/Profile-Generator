// Manager Info

const Employee = require("./Employee.js");

class Manager extends Employee {
  constructor(name, id, email, office) {
    super(name, id, email);
    this.office = office;
    this.title = "Manager";
  }
  getoffice() {
    return this.office;
  }
  getRole() {
    return this.title;
  }
}
module.exports = Manager;
