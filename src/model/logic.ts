import {noDescription, notEncoded} from "./encoding"
import {Event} from "./events"
import {Completion, State} from "./state"


export const updateFor = (state: State, event: Event):
        [number, number, string, Completion | undefined] => {
    const { dn, sd } = state.encoding
    const { nr1Vaccines, nr2Vaccines, nrRecoveries } = state.nrEvents
    const { primaryCourseCompletion } = state
    const nrVaccines = nr1Vaccines + nr2Vaccines + 1
    switch (event) {
        case "1V": {
            if (nrVaccines === 1) {
                return [1, 1, "primary course with 1-dose vaccine completed", "1V"]
            }
            if (primaryCourseCompletion === "2V+R") {
                return [nrVaccines, 1, "booster", "2V+R"]
            }
            return [nrVaccines, sd === 1 ? 1 : nrVaccines, "booster", primaryCourseCompletion]
        }
        case "2V": {
            if (primaryCourseCompletion !== undefined) {
                return [nrVaccines, primaryCourseCompletion === "2x2V" ? nrVaccines : 1, "booster", primaryCourseCompletion]
            }   // from here on (in this case): primary course not completed
            if (nr2Vaccines === 1) {
                return [2, 2, "primary course with 2-dose vaccine completed", "2x2V"]
            }
            if (nr2Vaccines === 0) {
                return nrRecoveries === 0
                    ? [1, 2, "primary course with 2-dose vaccine in progress", undefined]
                    : [1, 1, "primary course with 2-dose vaccine completed due to recovery", "2V+R"]
            }
            return [nr2Vaccines + 1, nr2Vaccines + 1, "booster", primaryCourseCompletion]
        }
        case "R": {
            if (primaryCourseCompletion === undefined && nr2Vaccines === 1) {
                return [2, 2, "primary course with 2-dose vaccine completed", "2V+R"]
            }
            return [dn, sd, "(just a recovery)", primaryCourseCompletion]
        }
    }

    return [notEncoded, notEncoded, noDescription, undefined]
}

