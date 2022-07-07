import {serializable} from "serialeazy";

import {V} from "Vector";

import {ClampedValue} from "math/ClampedValue";

import {GenInitialInfo} from "core/utils/PropInfoUtils";

import {AnalogComponent} from "analog/models";

import {CapacitanceInfo} from "analog/models/Units";

import {LeftRightPositioner} from "analog/models/ports/positioners/LeftRightPositioner";


const Info = {
    ...CapacitanceInfo("C", "Capacitance", 1, "u"),
};

@serializable("Capacitor")
export class Capacitor extends AnalogComponent {
    public constructor() {
        super(
            new ClampedValue(2),
            V(20, 60), new LeftRightPositioner(),
            GenInitialInfo(Info),
        );
    }

    public override getNetlistSymbol() {
        return "C" as const;
    }

    public override getNetlistValues() {
        return [`${this.props["C"]}`];
    }

    public getPropInfo(key: string) {
        return Info[key];
    }

    /**
     * Returns name of Component.
     *
     * @returns The string "Capacitor".
     */
    public getDisplayName(): string {
        return "Capacitor";
    }

    /**
     * Returns name of image file.
     *
     * @returns The string "capacitor.svg".
     */
    public getImageName(): string {
        return "capacitor.svg";
    }
}
