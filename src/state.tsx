import {Encoding, isValidInt, noDescription} from "./encoding"
import {combineNrEvents, Event, Events, NrEvents} from "./events"
import {reduceAccumulatively} from "./func-utils"
import {updateFor} from "./logic"


type State = {
    nrEvents: NrEvents
    encoding: Encoding
    lastEvent?: Event   // = undefined <==> description = "(initial)"
    summary: string
}


const propagate = (current: State, newEvent: Event): State => {
    const newNrEvents = combineNrEvents(current.nrEvents, newEvent)
    const result = updateFor(
        newEvent,
        current.encoding.dn, current.encoding.sd,
        current.nrEvents.nr1Vaccines, current.nrEvents.nr2Vaccines, current.nrEvents.nrRecoveries
    )
    return {
        nrEvents: newNrEvents,
        encoding: {
            dn: result[0],
            sd: result[1],
        },
        lastEvent: newEvent,
        summary: result[2]
    }
}

export const encode = (events: Events): State[] =>
    reduceAccumulatively(propagate, {
        nrEvents: {
            nr1Vaccines: 0,
            nr2Vaccines: 0,
            nrRecoveries: 0
        },
        encoding: {
            dn: 0,
            sd: 0
        },
        summary: "(initial)"
    })(events)


const StateRow = ({ state, idx }: { state: State, idx: number }) => {
    const { dn, sd } = state.encoding
    return <tr>
        <td className="step-num">{idx}</td>
        <td>{state.lastEvent ?? "-"}</td>
        <td className={isValidInt(dn) ? "" : "error"}>{dn}</td>
        <td className={isValidInt(sd) ? "" : "error"}>{sd}</td>
        <td className={state.summary === noDescription ? "error" : ""}>{state.summary}</td>
        <td>{state.nrEvents.nr1Vaccines}</td>
        <td>{state.nrEvents.nr2Vaccines}</td>
        <td>{state.nrEvents.nrRecoveries}</td>
    </tr>
}

export const StateTable = ({ states }: { states: State[] }) =>
    <table>
        <thead>
            <tr>
                <th>event#</th>
                <th>event</th>
                <th className="tt">dn</th>
                <th className="tt">sd</th>
                <th>summary</th>
                <th>#1<sup>s</sup></th>
                <th>#2<sup>s</sup></th>
                <th>#R<sup>s</sup></th>
            </tr>
        </thead>
        <tbody>
            {states.slice(1).map((state, idx) => <StateRow state={state} idx={idx + 1} />)}
        </tbody>
    </table>

