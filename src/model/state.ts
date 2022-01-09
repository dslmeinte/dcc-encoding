import {Encoding} from "./encoding"
import {combineNrEvents, Event, Events, NrEvents} from "./events"
import {reduceAccumulatively} from "../func-utils"
import {updateFor} from "./logic"


export type State = {
    nrEvents: NrEvents
    encoding: Encoding
    primaryCourseCompleted: boolean
    lastEvent?: Event   // = undefined <==> description = "(initial)"
    summary: string
}


const propagate = (current: State, newEvent: Event): State => {
    const newNrEvents = combineNrEvents(current.nrEvents, newEvent)
    const result = updateFor(current, newEvent)
    return {
        nrEvents: newNrEvents,
        encoding: {
            dn: result[0],
            sd: result[1],
        },
        primaryCourseCompleted: result[3],
        lastEvent: newEvent,
        summary: result[2]
    }
}

export const simulate = (events: Events): State[] =>
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
        primaryCourseCompleted: false,
        summary: "(initial)"
    })(events)

