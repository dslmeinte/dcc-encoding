export const redirecter = (eventsString: string) =>
    () => {
        location.href = `${location.pathname}?events=${eventsString}`
    }
