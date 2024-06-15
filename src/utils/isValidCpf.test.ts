import { assert, test } from "vitest";
import { isValidCpf } from "./isValidCpf";

test('should return true for a valid cpf', () => {
    assert(isValidCpf('00157624242'))
    assert(isValidCpf('76665291200'))
    assert(isValidCpf('44536578463'))
    assert(isValidCpf('51069362174'))
})