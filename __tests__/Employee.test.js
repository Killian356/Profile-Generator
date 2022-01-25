const Employee = require("../lib/Employee.js");

test("creates an employee object", () => {
    const employee = new Employee("smacky", 90, "smacky@gmail.com");

})

test("gets employee name", () => {
    const employee = new Employee("smacky", 90, "smacky@gmail.com");

    expect(employee.getName()).toBe("smacky");
});

test("gets employee id", () => {
    const employee = new Employee("smacky", 90, "smacky@gmail.com");

    expect(employee.getId()).toBe(90);
});

test("gets employee email", () => {
    const employee = new Employee("smacky", 90, "smacky@gmail.com");

    expect(employee.getEmail()).toBe("smacky@gmail.com");
});

test("gets employee role", () => {
    const employee = new Employee("smacky", 90, "smacky@gmail.com");

    expect(employee.getRole()).toBe("Employee");
    console.log(employee);
});