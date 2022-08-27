import { reValidEmail } from "../regex";

describe("Regex module", () => {
  describe("The reValidEmail", () => {
    it("Accepts valid emails", () => {
      expect(reValidEmail.test("test@gmail.com")).toBe(true);
    });

    it("Rejects invalid emails", () => {
      expect(reValidEmail.test("test@gmail")).toBe(false);
    });
  });
});
