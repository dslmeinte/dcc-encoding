export const redirecter = (eventsAsString: string) =>
    () => {
        location.href = `${location.pathname}?events=${eventsAsString}`
    }
