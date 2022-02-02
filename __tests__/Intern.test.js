// Intern Test

const Employee = require("../lib/Employee.js");

test("creates an employee object", () => {
  const employee = new Employee("Killian", 90, "Killian7195@gmail.com");
});
test("gets employee name", () => {
  const employee = new Employee("Killian", 90, "Killian7195@gmail.com");

  expect(employee.getName()).toBe("Killian");
});
test("gets employee id", () => {
  const employee = new Employee("Killian", 90, "Killian7195@gmail.com");

  expect(employee.getId()).toBe(90);
});
test("gets employee email", () => {
  const employee = new Employee("Killian", 90, "Killian7195@gmail.com");

  expect(employee.getEmail()).toBe("Killian7195@gmail.com");
});
test("gets employee role", () => {
  const employee = new Employee("Killian", 90, "Killian7195@gmail.com");

  expect(employee.getRole()).toBe("Employee");
  console.log(employee);
});
