import React from "react"
import ReactDOM from "react-dom"

import "./styling.css"
import {Events} from "./events"
import {encode, StateTable} from "./state"


const App = () => {
    const example: Events = [ "recovery", "1-vaccine", "2-vaccine", "recovery" ]
    return <main>
        <h1>DCC encoding simulator</h1>
        <h2>Simulation</h2>
        <StateTable states={encode(example)} />
        <h2>Legenda</h2>
        <dl>
            <dt>event</dt>
            <dd>A recorded event, being: recovery | vaccination with a 1-dose vaccine | vaccination with a 2-dose vaccine.</dd>

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
        <p>
            This mini-app has been developed by the <a href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN), as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
        </p>
    </main>
}

ReactDOM.render(<App />, document.getElementById("root"))

