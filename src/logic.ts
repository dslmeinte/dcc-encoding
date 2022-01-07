import {Event} from "./events"
import {noDescription, notEncoded} from "./encoding"


export const updateFor = (
            event: Event,
            dn: number, sd: number,   // ...but don't want to use those, really...
            nr1Vaccines: number, nr2Vaccines: number, nrRecoveries: number
        ): [number, number, string] => {
    switch (event) {
        case "1V": {
            if (nr1Vaccines === 0) {
                if (nrRecoveries === 0) {
                    return [1, 1, "primary course with 1-dose vaccine completed"]
                } else {
                    return [2, 1, "recovery + primary course with 1-dose vaccine completed"]
                }
            } else {    // nr1Vaccines > 0
                // ...
            }
            break
        }
        case "2V": {
            if (nr2Vaccines === 0) {
                if (nrRecoveries === 0) {
                    return [1, 2, "primary course with 2-dose vaccine in progress"]
                } else {
                    return [2, 2, "primary course with 2-dose vaccine completed"]
                }
            } else {    // nr2Vaccines > 0
                if (dn >= sd) {
                    return [dn + 1, sd, "+++"]
                } else {
                    // ...
                }
            }
            if (dn === 2 && sd === 1) {
                return [dn + 1, sd, "Janssen-kinded booster"]
            }
            break
        }
        case "R": {
            if (nr2Vaccines === 1) {
                return [2, 2, "primary course with 2-dose vaccine completed"]
            }
            return [dn, sd, "(just a recovery)"]
            break
        }
    }

    return [notEncoded, notEncoded, noDescription]
}

