export const isValidCpf = (value: string): boolean => {
    const cpfToValidate = value.replaceAll(".", "").replace("-", "")
    const firstSixDigits = cpfToValidate.slice(0, -2)
    const lastTwoDigits = cpfToValidate.slice(-2)

    const digits = []
    let factor = 2
    let sum = 0

    const reversedSixDigits = firstSixDigits.split("").reverse().join()

    for (const num of reversedSixDigits) {
        sum += Number(num) * factor
        factor++
    }

    let remainder = sum % 11

    if (remainder < 2) {
        digits.push(0)
    } else {
        digits.push(11 - remainder)
    }

    const firstSevenDigits = firstSixDigits + String(digits[0])

    factor = 2
    sum = 0

    const reversedSevenDigits = firstSevenDigits.split("").reverse().join("")

    for (const num of reversedSevenDigits) {
        sum += Number(num) * factor
        factor++
    }

    remainder = sum % 11

    if (remainder < 2) {
        digits.push(0)
    } else {
        digits.push(11 - remainder)
    }

    if (digits.join() !== lastTwoDigits) {
        return false
    }

    return true
};