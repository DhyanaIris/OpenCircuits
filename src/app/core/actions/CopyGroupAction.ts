import {Transform} from "math/Transform";

import {CopyGroup,
        IOObjectSet} from "core/utils/ComponentUtils";

import {Action} from "core/actions/Action";

import {CircuitDesigner} from "core/models/CircuitDesigner";
import {IOObject} from "core/models/IOObject";
import {isPressable} from "core/utils/Pressable";

// TODO: Change this terribleness
export class CopyGroupAction implements Action {
    private designer: CircuitDesigner;

    protected copy: IOObjectSet;

    private transforms: Transform[];

    public constructor(designer: CircuitDesigner, initialGroup: IOObject[]) {
        this.designer = designer;
        this.copy = CopyGroup(initialGroup);

        this.transforms = this.copy.getComponents().map(c => c.getTransform());
    }

    public execute(): Action {
        // Unpresses button of newly placed copy
        //  See: https://github.com/OpenCircuits/OpenCircuits/issues/545
        for (const object of this.copy.toList()) {
            if (isPressable(object))
                object.release();
        }
        this.designer.addGroup(this.copy);

        return this;
    }

    public undo(): Action {
        // Remove wires first
        for (const wire of this.copy.getWires())
            this.designer.removeWire(wire);

        // Remove objects
        for (const obj of this.copy.getComponents())
            this.designer.removeObject(obj);

        return this;
    }

    public getCopies(): IOObjectSet {
        return this.copy;
    }

}
