export type Encoding = {
    dn: number
    sd: number
}

export const isValidInt = (num: number): boolean =>
    Number.isInteger(num) && num >= 0

export const notEncoded = -1

export const noDescription = "???"

