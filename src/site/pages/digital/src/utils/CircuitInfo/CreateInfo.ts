import {CircuitController}        from "core/controllers/CircuitController";
import {ViewManager}              from "core/views/ViewManager";
import {DigitalCircuitController} from "digital/controllers/DigitalCircuitController";
import {CreateView}               from "digital/views";
import {DigitalViewInfo}          from "digital/views/DigitalViewInfo";

import {V} from "Vector";

import {Camera} from "math/Camera";

import {Input}             from "core/utils/Input";
import {RenderQueue}       from "core/utils/RenderQueue";
import {SelectionsWrapper} from "core/utils/SelectionsWrapper";

import {HistoryManager} from "core/actions/HistoryManager";

import {DefaultTool} from "core/tools/DefaultTool";
import {Tool}        from "core/tools/Tool";
import {ToolManager} from "core/tools/ToolManager";

import {Circuit, DefaultCircuit} from "core/models/Circuit";

import {DigitalObj} from "core/models/types/digital";

import {DigitalCircuitInfo} from "digital/utils/DigitalCircuitInfo";

import {DigitalSim} from "digital/models/sim/DigitalSim";


export function CreateInfo(defaultTool: DefaultTool, ...tools: Tool[]) {
    const history = new HistoryManager();

    const circuit = new CircuitController<DigitalObj>(DefaultCircuit(), "DigitalWire", "DigitalNode");
    const sim = new DigitalSim(circuit);

    const viewManager = new ViewManager<DigitalObj, DigitalCircuitController, DigitalViewInfo>(
        { circuit, sim }, CreateView
    );

    const selections = new SelectionsWrapper();
    const renderer = new RenderQueue();
    const toolManager = new ToolManager(defaultTool, ...tools);

    const info: DigitalCircuitInfo = {
        locked: false,
        history,
        camera: new Camera(),

        circuit,
        viewManager,
        sim,

        // This is necessary because input is created later in the pipeline because it requires canvas
        input: undefined as unknown as Input,
        selections,
        toolManager,
        renderer,

        debugOptions: {
            debugCullboxes:       false,
            debugPressableBounds: false,
            debugSelectionBounds: false,
            debugNoFill:          false,
        },
    };

    const reset = (c?: Circuit<DigitalObj>) => {
        // info.camera =  new Camera();
        info.camera.setPos(V());
        info.camera.setZoom(0.02);

        selections.get().forEach((id) => selections.deselect(id));
        history.reset();

        // Reset circuit
        circuit.reset(c);
        viewManager.reset(c);

        renderer.render();
    }

    return [info, reset] as const;
}
