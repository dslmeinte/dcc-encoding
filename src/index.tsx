import React from "react"
import ReactDOM from "react-dom"

import "./styling.css"
import {eventsFrom} from "./events"
import {encode, StateTable} from "./state"
import {TestTable} from "./tests"


const App = () => {
    const params = new URLSearchParams(location.search)

    const events = eventsFrom(params.get("events"))
    if (events === null) {
        location.href = `${location.pathname}?events=R,1V,2V,R`
        return <span>(redirecting to URL with example query parameter "events")</span>
    }

    return <main>
        <h1>DCC encoding simulator</h1>
        <h2>Simulation</h2>
        <StateTable states={encode(events)} />
        <h2>Legenda</h2>
        <dl>
            <dt>event</dt>
            <dd>A recorded event, being: R = recovery | 1V = vaccination with a 1-dose vaccine | 2V = vaccination with a 2-dose vaccine.</dd>

            <dt className="tt">dn/sd</dt>
            <dd>The <span className="tt">dn/sd</span> fields' values in the issued DCC.</dd>

            <dt>summary</dt>
            <dd>A summary of the events so far.</dd>

            <dt>#<em>&lt;event&gt;</em><sup>s</sup></dt>
            <dd>The number of events per type so far.</dd>
        </dl>
        <h2>Explanation</h2>
        <p>
            The table above accumulatively shows a simulation of the issuance of DCCs, focused specifically on the encoding of vaccinations vis-à-vis boosters, based on consecutive events.
            These events are found (in order) in the “event” column.

        </p>
        <h2>Test cases</h2>
        <p>
            The following test cases serve as unit tests.
            Click the “Simulate”-button of a test case to run the simulator on the corresponding events.
        </p>
        <TestTable />
        <p>
            This mini-app has been developed by the <a href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN), as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
        </p>
    </main>
}

ReactDOM.render(<App />, document.getElementById("root"))

