import {PropInfoRecord} from "core/models/PropInfo";

import {AnalogObj} from "core/models/types/analog";

import {DefaultComponentPropInfo, DefaultPortPropInfo, DefaultWirePropInfo} from "core/views/DefaultPropInfo";


export const AnalogPropInfo: PropInfoRecord<AnalogObj> = {
    "AnalogPort": DefaultPortPropInfo,
    "AnalogWire": DefaultWirePropInfo,
    "AnalogNode": DefaultComponentPropInfo,

    "Resistor": {
        ...DefaultComponentPropInfo,
        "resistance": { type: "float", label: "Resistance", step: 100, min: 0 },
    },
    "Inductor": {
        ...DefaultComponentPropInfo,
        "inductance": { type: "float", label: "Inductance", step: 10, min: 0 },
    },
    "CurrentSource": {
        ...DefaultComponentPropInfo,
        "amperage": { type: "float", label: "Amperage", step: 1, min: 0 },
    },
    "Ground": DefaultComponentPropInfo,
} as const;
