export const last = <T>(arr: T[]): T =>
    arr[arr.length - 1]


export const reduceAccumulatively = <AT, VT>(lambda: (acc: AT, value: VT) => AT, init: AT): ((vs: VT[]) => AT[]) =>
    (vs: VT[]) =>
        vs.reduce((acc: AT[], v: VT) => [...acc, lambda(last(acc), v)], [init])


export const range = (n: number): number[] =>
    [...new Array(n).keys()]


export const sequencesOfLength = <T>(alphabet: T[], length: number): T[][] => {
    const n = alphabet.length
    const sequences: T[][] = []
    const counters = range(length).map((_) => 0)
    let stop = false
    while (!stop) {
        sequences.push(counters.map((c) => alphabet[c]))
        let carry = 1
        for (let i = 0; i < length; i++) {
            counters[i] += carry
            if (counters[i] >= n) {
                counters[i] = 0
                carry = 1
            } else {
                carry = 0
            }
        }
        stop = carry === 1
    }
    return sequences
}


export const sequencesUptoLength = <T>(alphabet: T[], length: number): T[][] =>
    range(length).flatMap((l) => sequencesOfLength(alphabet, l+1))


export const randInt = (maxNum: number) =>
    Math.floor(maxNum * Math.random())

