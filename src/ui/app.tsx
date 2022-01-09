import React from "react"
import {eventsFrom, randomSequenceAsString, updaterFor} from "../model/events"
import {redirecter} from "./url-util"
import {StateTable} from "./state"
import {simulate} from "../model/state"
import {TestTable} from "./tests"


export const App = () => {
    const params = new URLSearchParams(location.search)

    const events = eventsFrom(params.get("events"))
    if (events === null) {
        redirecter("R,1V,2V,R")()
        return <span>(redirecting to URL with example query parameter "events")</span>
    }

    return <main>
        <h1>DCC encoding simulator</h1>
        <h2>Explanation</h2>
        <p>
            The table below shows a simulation of the issuance of DCCs, focused specifically on the encoding of vaccinations vis-à-vis boosters, based on a sequence of consecutive “events” (either recoveries, or vaccinations).
            The purpose of this is to see how the <span className="tt">dn/sd</span> fields' values are (to be) calculated (and why).
            This should be accordance with <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32021D2301&qid=1641543677595" target="_blank">EU Implementing Decision 2021/2301</a>.
            (The simulation does not take into account how long ago any of the events occurred.)
        </p>
        <h3>Disclaimer</h3>
        <p>
            This mini-app is for internal development purposes only.
            No rights can be derived from it.
        </p>
        <h2>Simulation</h2>
        <p>
            The sequence of events is governed by the “<span className="tt">events</span>” query parameter in the URL.
            You can modify the events in the table below - the simulation is re-run automatically, and the URL is updated accordingly.
            You can extend the sequence by choosing an event in the last step.
            You can remove an event by choosing the “-” event.
            Alternatively: modify the URL to simulate a particular sequence of events, which must be encoded as a comma-separated string of any of “R”, “1V”, or “2V”.
        </p>
        <StateTable states={simulate(events)} update={updaterFor(events)} />
        <p>
            Click this button to generate a (short) random sequence of events, and simulate that - this modifies the URL.
        </p>
        <button onClick={redirecter(randomSequenceAsString())}>Simulate random sequence of events</button>
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
        <h2>Test cases</h2>
        <p>
            The following test cases serve as unit tests.
            Click the “Simulate”-button of a test case to run the simulator on the corresponding events.
        </p>
        <TestTable />
        <p>
            This mini-app has been developed by the <a href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN), as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
            <br/>
            The source can be found in this GitHub repository: <a href="https://github.com/dslmeinte/dcc-encoding" target="_blank" className="tt">https://github.com/dslmeinte/dcc-encoding</a>.
        </p>
    </main>
}

