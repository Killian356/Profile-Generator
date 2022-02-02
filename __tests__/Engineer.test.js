// Engineer Test

const Engineer = require("../lib/Engineer.js");

test("creates an engineer object", () => {
  const engineer = new Engineer(
    "Killian",
    90,
    "Killian7195@gmail.com",
    "GitHub"
  );
});

test("gets engineer name", () => {
  const engineer = new Engineer(
    "Killian",
    90,
    "Killian7195@gmail.com",
    "GitHub"
  );

  expect(engineer.getName()).toBe("Killian");
});

test("gets engineer id", () => {
  const engineer = new Engineer(
    "Killian",
    90,
    "Killian7195@gmail.com",
    "GitHub"
  );

  expect(engineer.getId()).toBe(90);
});

test("gets engineer email", () => {
  const engineer = new Engineer(
    "Killian",
    90,
    "Killian7195@gmail.com",
    "GitHub"
  );

  expect(engineer.getEmail()).toBe("Killian7195@gmail.com");
});

test("gets engineer role", () => {
  const engineer = new Engineer(
    "Killian",
    90,
    "Killian7195@gmail.com",
    "GitHub"
  );

  expect(engineer.getRole()).toBe("Employee");
  console.log(engineer);
});

test("gets engineer github", () => {
  const engineer = new Engineer(
    "Killian",
    90,
    "Killian7195@gmail.com",
    "GitHub"
  );

  expect(engineer.getGithub()).toBe("GitHub");
});
