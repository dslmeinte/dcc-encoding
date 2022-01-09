import {encodingAsString} from "../model/encoding"
import {eventsFrom} from "../model/events"
import {last} from "../func-utils"
import {simulate} from "../model/state"
import {redirecter} from "./url-util"


type TestCase = {
    events: string
    expectedEncoding: string
}


const testCases: TestCase[] = [
    {
        events: "R",
        expectedEncoding: "0/0"
    },
    {
        events: "1V",
        expectedEncoding: "1/1"
    },
    {
        events: "R,2V",
        expectedEncoding: "2/1"
    },
    {
        events: "1V,1V",
        expectedEncoding: "2/1"
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
        events: "2V,2V,2V",
        expectedEncoding: "3/3"
    },
]


const TestRow = ({ testCase }: { testCase: TestCase }) => {
    const expectedEncodingAsText = testCase.expectedEncoding
    const actualEncodingAsText = encodingAsString(last(simulate(eventsFrom(testCase.events)!!)).encoding)
    const pass = expectedEncodingAsText === actualEncodingAsText && actualEncodingAsText.indexOf("-1") === -1
    return <tr>
        <td>{testCase.events.replaceAll(",", ", ")}</td>
        <td>{expectedEncodingAsText}</td>
        <td className="center">
            <button
                className={pass ? "pass" : "fail"}
                onClick={redirecter(testCase.events)}
            >{actualEncodingAsText}</button>
        </td>
    </tr>
}

export const TestTable = () =>
    <table>
        <thead>
            <tr>
                <td>events</td>
                <td>expected</td>
                <td>actual</td>
            </tr>
        </thead>
        <tbody>
            {testCases.map((testCase, index) => <TestRow testCase={testCase} key={index} />)}
        </tbody>
    </table>

