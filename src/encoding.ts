export type Encoding = {
    dn: number
    sd: number
}

export const isValidInt = (num: number): boolean =>
    Number.isInteger(num) && num >= 0

export const notEncoded = -1

export const noDescription = "???"


export const encodingAsString = ({ dn, sd }: Encoding) =>
    `${dn}/${sd}`

/*
export const encodingFromString = (str: string) => {
    const parts = str.split("/").map((part) => parseInt(part, 10))
    return { dn: parts[0], sd: parts[1] }
}
 */

