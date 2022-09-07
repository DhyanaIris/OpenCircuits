import type {Action} from "core/actions/Action";

import {PortChangeAction} from "core/actions/ports/PortChangeAction";

import type {Port} from "core/models/ports/Port";

import type {DigitalComponent} from "digital/models/DigitalComponent";


/**
 * This code allows for the change in the number of output ports on a DigitalComponent.
 */
export class OutputPortChangeAction extends PortChangeAction {
    protected obj: DigitalComponent;

    /**
     * This code constructs the obj with the new number of ports.
     *
     * @param obj     The object being changed.
     * @param initial Number of ports.
     * @param target  Number of ports.
     */
    public constructor(obj: DigitalComponent, initial: number, target: number) {
        super(obj.getDesigner(), target, initial);
        this.obj = obj;
    }

    /**
     * Returns the objects output ports.
     *
     * @returns The objects output inports.
     */
    protected getPorts(): Port[] {
        return this.obj.getOutputPorts();
    }

    /**
     * Changes the number of output ports on the object to the target count.
     *
     * @returns The object with the new number of ports.
     */
    public execute(): Action {
        super.execute();
        this.obj.setOutputPortCount(this.targetCount);
        return this;
    }

    /**
     * Resets the number of output ports back to the initial count.
     *
     * @returns The object with the initial number of ports.
     */
    public undo(): Action {
        this.obj.setOutputPortCount(this.initialCount);
        super.undo();
        return this;
    }

    public getName(): string {
        return "Outport Change";
    }
}
