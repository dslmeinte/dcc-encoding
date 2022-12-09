export type TestCase = {
    events: string
    expectedEncoding: string
}


export const testCases: TestCase[] = [
    {
        events: "1V,1V",
        expectedEncoding: "2/1"
    },
    {
        events: "R,2V,2V",
        expectedEncoding: "2/1"
    },
    {
        events: "2V,R,2V",
        expectedEncoding: "2/2"
    },
    {
        events: "1V,2V",
        expectedEncoding: "2/1"
    },
    {
        events: "R,2V,1V",
        expectedEncoding: "2/1"
    },
    {
        events: "2V,R,1V",
        expectedEncoding: "2/2"
    },
    {
        events: "2V,2V,2V",
        expectedEncoding: "3/3"
    },
    {
        events: "2V,2V,R,2V",
        expectedEncoding: "3/3"
    },
    {
        events: "2V,2V,2V,2V",
        expectedEncoding: "4/4"
    },
    {
        events: "2V,2V,2V,2V,1V",
        expectedEncoding: "5/5"
    },
    {
        events: "1V",
        expectedEncoding: "1/1"
    },
    {
        events: "1V,1V,1V",
        expectedEncoding: "3/1"
    },
    {
        events: "1V,1V,2V",
        expectedEncoding: "3/1"
    },
    {
        events: "2V",
        expectedEncoding: "1/2"
    },
    {
        events: "2V,2V",
        expectedEncoding: "2/2"
    },
    {
        events: "R,2V",
        expectedEncoding: "1/1"
    },
    {
        events: "R",
        expectedEncoding: "0/0"
    }
]

