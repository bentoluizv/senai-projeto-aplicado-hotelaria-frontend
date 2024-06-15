import { expect, test } from "vitest";
import { isValidCpf } from "./isValidCpf";

test('should return true for a valid cpf', () => {
    expect(isValidCpf("001.576.242-42")).toBe(true)
})