import React from "react"
import {createRoot} from "react-dom/client"

import "./styling.css"
import {App} from "./ui/app"


const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<App />)

