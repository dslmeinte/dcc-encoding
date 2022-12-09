export const last = <T>(arr: T[]): T =>
    arr[arr.length - 1]


export const reduceAccumulatively = <AT, VT>(lambda: (acc: AT, value: VT) => AT, init: AT): ((vs: VT[]) => AT[]) =>
    (vs: VT[]) =>
        vs.reduce((acc: AT[], v: VT) => [...acc, lambda(last(acc), v)], [init])

