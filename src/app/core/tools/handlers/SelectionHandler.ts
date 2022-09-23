import {LEFT_MOUSE_BUTTON} from "core/utils/Constants";

import {CircuitInfo} from "core/utils/CircuitInfo";
import {Event}       from "core/utils/Events";

import {GroupAction} from "core/actions/GroupAction";

import {Deselect, DeselectAll, Select} from "core/actions/units/Select";

import {EventHandler} from "../EventHandler";


export const SelectionHandler: EventHandler = ({
    conditions: (event: Event, {}: CircuitInfo) =>
        (event.type === "click" && event.button === LEFT_MOUSE_BUTTON),

    getResponse: ({ input, camera, history, selections, viewManager }: CircuitInfo) => {
        // const action = new GroupAction([], "Selection Handler");
        const worldMousePos = camera.getWorldPos(input.getMousePos());

        // const ports = GetAllPorts(designer.getObjects());
        // const objs = [...designer.getObjects().reverse(), ...designer.getWires().reverse()];
        const results = viewManager.findNearestObj(worldMousePos);

        // If nothing was clicked, check if we should deselect and exit
        if (!results) {
            // Clear selections if not holding shift
            if (!input.isShiftKeyDown())
                history.add(DeselectAll(selections));
            return;
        }

        // Don't select/deselect if they clicked the Pressable bounds of an object
        if (results.bounds === "press")
            return;

        const { obj } = results;

        // // Only select if object was hit and
        // //  if we clicked a port but also hit a wire, we want to prioritize
        // //  the port (for WiringTool), so do NOT select
        // if (!(hitPort && isWire)) {

        const deselectAll = (!input.isShiftKeyDown());

        // Boolean to decide if we should select or deselect the object
        const select = (!input.isShiftKeyDown() || !selections.has(obj.id));
        history.add(
            new GroupAction([
                ...(deselectAll ? [DeselectAll(selections)] : []),
                (select ? Select(selections, obj.id) : Deselect(selections, obj.id)),
                // TODO: Shift
            ])
        );
    },
});
