import {noDescription, notEncoded} from "./encoding"
import {Event} from "./events"
import {State} from "./state"


export const updateFor = (state: State, event: Event):
        [number, number, string, boolean] => {
    const { dn, sd } = state.encoding
    const { nr1Vaccines, nr2Vaccines, nrRecoveries } = state.nrEvents
    const { primaryCourseCompleted } = state
    switch (event) {
        case "1V": {
            if (nr1Vaccines === 0 && nr2Vaccines === 0) {
                return [1, 1, "primary course with 1-dose vaccine completed", true]
            } else {    // nr1Vaccines > 0
                return [nr1Vaccines + nr2Vaccines + 1, 1, "booster", true]
            }
            // break
        }
        case "2V": {
            if (primaryCourseCompleted) {
                return [dn + 1, sd === 1 ? 1 : sd + 1, "booster", true]
            }
            if (nr2Vaccines === 0) {
                if (nrRecoveries === 0) {
                    return [1, 2, "primary course with 2-dose vaccine in progress", false]
                } else {
                    return [2, 1, "primary course with 2-dose vaccine completed", true]
                }
            } else if (nr2Vaccines === 1) {
                return [2, 2, "primary course with 2-dose vaccine completed", true]
            } else {
                return [nr2Vaccines + 1, nr2Vaccines + 1, "booster", true]
            }
            // break
        }
        case "R": {
            if (!primaryCourseCompleted && nr2Vaccines === 1) {
                return [2, 2, "primary course with 2-dose vaccine completed", true]
            }
            return [dn, sd, "(just a recovery)", primaryCourseCompleted]
            // break
        }
    }

    return [notEncoded, notEncoded, noDescription, primaryCourseCompleted]
}
