export type Events = Event[]

export type Event = "1V" | "2V" | "R"

export const allEvents: Event[] = ["1V", "2V", "R"]


// export const isVaccination = (event: Event) => event === "1-vaccine" || event === "2-vaccine"


export const eventsFrom = (str: string | null): Events | null => {
    if (str === null || str.trim().length === 0) {
        return null
    }
    const splitEvents = str.split(",")
    if (!splitEvents.every((fragment) => ( allEvents as string[]).indexOf(fragment) > -1)) {
        return null
    }
    return splitEvents as Events
}


export type NrEvents = {
    nr1Vaccines: number
    nr2Vaccines: number
    nrRecoveries: number
}

export const combineNrEvents = (current: NrEvents, newEvent: Event): NrEvents =>
    ({
        nr1Vaccines: current.nr1Vaccines + (newEvent === "1V" ? 1 : 0),
        nr2Vaccines: current.nr2Vaccines + (newEvent === "2V" ? 1 : 0),
        nrRecoveries: current.nrRecoveries + (newEvent === "R" ? 1 : 0)
    })


const randInt = (maxNum: number) =>
    Math.floor(maxNum * Math.random())

const range = (len: number) =>
    Array.from(Array(len).keys())

export const randomSequenceAsString = () =>
    range(randInt(4) + 1).map(_ => allEvents[randInt(allEvents.length)]).join(",")

