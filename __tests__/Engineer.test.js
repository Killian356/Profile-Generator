const Engineer = require("../lib/Engineer.js");
// jest.mock("../lib/Engineer.js");

test("creates an engineer object", () => {
    const engineer = new Engineer("smacky", 90, "smacky@gmail.com", "smackyHub");

})

test("gets engineer name", () => {
    const engineer = new Engineer("smacky", 90, "smacky@gmail.com", "smackyHub");

    expect(engineer.getName()).toBe("smacky");
});

test("gets engineer id", () => {
    const engineer = new Engineer("smacky", 90, "smacky@gmail.com", "smackyHub");

    expect(engineer.getId()).toBe(90);
});

test("gets engineer email", () => {
    const engineer = new Engineer("smacky", 90, "smacky@gmail.com", "smackyHub");

    expect(engineer.getEmail()).toBe("smacky@gmail.com");
});

test("gets engineer role", () => {
    const engineer = new Engineer("smacky", 90, "smacky@gmail.com", "smackyHub");

    expect(engineer.getRole()).toBe("Engineer");
    console.log(engineer);
});

test("gets engineer github", () => {
    const engineer = new Engineer("smacky", 90, "smacky@gmail.com", "smackyHub");

    expect(engineer.getGithub()).toBe("smackyHub");
})