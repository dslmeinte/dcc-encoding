import {Event} from "./events"
import {noDescription, notEncoded} from "./encoding"


export const updateFor = (event: Event, dn: number, sd: number, nr1Vaccines: number, nr2Vaccines: number, nrRecoveries: number): [ number, number, string ] => {
    switch (event) {
        case "1-vaccine": {
            if (nr1Vaccines === 0) {
                if (nr2Vaccines === 0) {
                    if (nrRecoveries === 0) {
                        return [ 1, 1, "primary course 1-dose vaccine completed" ]
                    } else {
                        return [ 2, 1, "recovery + primary course 1-dose vaccine completed"]
                    }
                } else {    // nr2Vaccines > 0
                    if (dn >= sd) {
                        return [ dn + 1, sd, "+++" ]
                    } else {
                        // ...
                    }
                }
            } else {    // nr1Vaccines > 0
                // ...
            }
            break
        }
        case "2-vaccine": {
            if (dn === 2 && sd === 1) {
                return [ dn + 1, sd, "Janssen-kinded booster"]
            }
            break
        }
        case "recovery": {
            if (nr1Vaccines === 0) {
                if (nr2Vaccines === 0) {
                    return [ dn, sd, "(just a recovery)" ]
                }
            }
        }
    }

    return [ notEncoded, notEncoded, noDescription ]
}

