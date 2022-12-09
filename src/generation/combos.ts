import {writeFileSync} from "fs"

import {Encoding} from "../model/encoding"
import {allEvents, Sequence} from "../model/events"
import {simulate} from "../model/state"
import {last, sequencesUptoLength} from "../func-utils"


const uptoLength = (length: number): Sequence[] =>
    sequencesUptoLength(allEvents, length)


type Combo = [seq: Sequence, encoding: Encoding]

const combosUptoLength = (length: number): Combo[] =>
    uptoLength(length)
        .map((seq) => [seq, last(simulate(seq)).encoding])

const comboAsString = ([seq, encoding]: Combo) =>
    `${seq.join(" + ")} = ${encoding.dn}/${encoding.sd}`


writeFileSync("public/static/sequences-up-to-5.txt", combosUptoLength(5).map(comboAsString).join("\n"))

