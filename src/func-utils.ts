export function last<T>(arr: T[]): T {
    return arr[arr.length - 1]
}

export function reduceTracing<AT, VT>(lambda: (acc: AT, value: VT) => AT, init: AT): ((vs: VT[]) => AT[]) {
    return (vs: VT[]) =>
        vs.reduce((acc: AT[], v: VT) => [...acc, lambda(last(acc), v)], [init])
}

// TODO  type s.t. last(..) receives a non-empty array

