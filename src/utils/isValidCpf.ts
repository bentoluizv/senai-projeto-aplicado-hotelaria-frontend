export const isValidCpf = (value: string): boolean => {
    const cpfToValidate = value.replaceAll(".", "").replace("-", "")
    const firstSixDigits = cpfToValidate.slice(0, -2)
    const lastTwoDigits = cpfToValidate.slice(-2)
    const firstDigit = calculateDigits(firstSixDigits)
    const secondDigit = calculateDigits(firstDigit + firstDigit)
    const digits = firstDigit + secondDigit
    return digits === lastTwoDigits
};


function calculateDigits(sequence: string): string {
    let factor = 2
    let sum = 0

    const sequenceArr = sequence.split("").reverse()
    for (const num of sequenceArr) {
        sum += Number(num) * factor
        factor++
    }

    let remainder = sum % 11
    const digit = remainder < 2 ?  0 : 11 - remainder
    return String(digit)
}