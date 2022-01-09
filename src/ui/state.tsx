import {isValidInt, noDescription} from "../model/encoding"
import {allEvents, Event, EventOrNothing, eventsAsString, EventsUpdater} from "../model/events"
import {State} from "../model/state"
import {redirecter} from "./url-util"


export const EventChooser = ({ event, index, update }: { event: EventOrNothing, index : number, update: EventsUpdater }) =>
    <select
        value={event === undefined ? "-" : event}
        onChange={(selectEvent) => {
            const newEvent = selectEvent.target.value
            redirecter(
                eventsAsString(
                    update(index, newEvent === "-" ? undefined : (newEvent as Event))
                )
            )()
        }}
    >
        {index > 0 &&
            <option value="-">-</option>
        }
        {allEvents.map((choice, idx) =>
            <option key={idx}>{choice}</option>
        )}
    </select>


const StateRow = ({ state, index, update }: { state: State, index: number, update: EventsUpdater }) => {
    const { dn, sd } = state.encoding
    return <tr>
        <td className="step-num">{index + 1}</td>
        <td><EventChooser event={state.lastEvent} index={index} update={update} /></td>
        <td className={isValidInt(dn) ? "" : "error"}>{dn}</td>
        <td className={isValidInt(sd) ? "" : "error"}>{sd}</td>
        <td className={state.summary === noDescription ? "error" : ""}>{state.summary}</td>
        <td>{state.nrEvents.nr1Vaccines}</td>
        <td>{state.nrEvents.nr2Vaccines}</td>
        <td>{state.nrEvents.nrRecoveries}</td>
        <td>{state.primaryCourseCompleted ? "\u2713": ""}</td>
    </tr>
}

export const StateTable = ({ states, update }: { states: State[], update: EventsUpdater }) =>
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
                <th>primary course completed</th>
            </tr>
        </thead>
        <tbody>
            {states.slice(1).map((state, index) =>
                <StateRow state={state} update={update} index={index} key={index} />
            )}
            <tr>
                <td className="step-num">{states.length}</td>
                <td><EventChooser event={undefined} index={states.length} update={update} /></td>
                <td colSpan={3}>&larr; choose an event (1V | 2V | R) to add it to the sequence</td>
            </tr>
        </tbody>
    </table>

