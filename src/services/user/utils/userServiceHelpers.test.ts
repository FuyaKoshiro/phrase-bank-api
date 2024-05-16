import { validateUserToCreate } from "./userServiceHelpers";

describe("validateUserToCreate", () => {
  it("given a valid user input, should return a user", async () => {
    const user = {
      id: "1",
      email: "example@gmail.com",
      name: "John Doe",
    };

    const result = validateUserToCreate(user);
    expect(result).toEqual(user);
  });

  it("given a user input with an invalid email, should throw an error", async () => {
    const user = {
      email: "invalid email",
      name: "John Doe",
    };

    expect(() => validateUserToCreate(user)).toThrow();
  });
});
