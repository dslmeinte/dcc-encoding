import {encodingAsString} from "../model/encoding"
import {eventsFrom} from "../model/events"
import {last} from "../func-utils"
import {simulate} from "../model/state"
import {TestCase, testCases} from "../model/tests"
import {redirecter} from "./url-util"


const TestRow = ({ testCase }: { testCase: TestCase }) => {
    const expectedEncodingAsText = testCase.expectedEncoding
    const actualEncodingAsText = encodingAsString(last(simulate(eventsFrom(testCase.events)!!)).encoding)
    const pass = expectedEncodingAsText === actualEncodingAsText && actualEncodingAsText.indexOf("-1") === -1
    return <tr>
        <td>{testCase.events.replaceAll(",", ", ")}</td>
        <td className="center">{expectedEncodingAsText}</td>
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
                <td>exp.</td>
                <td>act.</td>
            </tr>
        </thead>
        <tbody>
            {testCases.map((testCase, index) => <TestRow testCase={testCase} key={index} />)}
        </tbody>
    </table>

