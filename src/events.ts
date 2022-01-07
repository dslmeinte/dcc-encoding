export type Events = Event[]

export type Event = "1-vaccine" | "2-vaccine" | "recovery"

export const allEvents: Event[] = [ "1-vaccine", "2-vaccine", "recovery" ]

// export const isVaccination = (event: Event) => event === "1-vaccine" || event === "2-vaccine"


export type NrEvents = {
    nr1Vaccines: number
    nr2Vaccines: number
    nrRecoveries: number
}

export const combineNrEvents = (current: NrEvents, newEvent: Event): NrEvents =>
    ({
        nr1Vaccines: current.nr1Vaccines + (newEvent === "1-vaccine" ? 1 : 0),
        nr2Vaccines: current.nr2Vaccines + (newEvent === "2-vaccine" ? 1 : 0),
        nrRecoveries: current.nrRecoveries + (newEvent === "recovery" ? 1 : 0)
    })

