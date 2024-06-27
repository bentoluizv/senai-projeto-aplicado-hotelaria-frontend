import { expect, test } from "vitest";
import { formatPhoneNumber } from "./formatPhoneNumber";

test("should format a phone number", () => {
  expect(formatPhoneNumber("48992054211")).toBe("(48) 99205-4211");
});
