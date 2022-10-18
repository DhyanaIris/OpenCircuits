import {DEFAULT_BORDER_COLOR, DEFAULT_BORDER_WIDTH, DEFAULT_FILL_COLOR, MULTIPLEXER_HEIGHT_OFFSET, DEFAULT_CURVE_BORDER_WIDTH, SELECTED_BORDER_COLOR, SELECTED_FILL_COLOR} from "core/utils/Constants";

import {V} from "Vector";

import {Rect} from "math/Rect";

import {Style} from "core/utils/rendering/Style";

import {Line} from "core/utils/rendering/shapes/Line";
import { Polygon } from "core/utils/rendering/shapes/Polygon";

import {Multiplexer, DigitalPortGroup} from "core/models/types/digital";

import {RenderInfo}               from "core/views/BaseView";
import {ComponentView}            from "core/views/ComponentView";
import {DigitalCircuitController} from "digital/controllers/DigitalCircuitController";

import {DigitalViewInfo} from "../DigitalViewInfo";



export class MultiplexerView extends ComponentView<Multiplexer, DigitalViewInfo> {
    public constructor(circuit: DigitalViewInfo, obj: Multiplexer) {
        super(circuit, obj, V(1,1));
    }

    protected override renderComponent({ renderer, selections }: RenderInfo): void {

        const selected = selections.has(this.obj.id);

        const transform = this.getTransform();
        const borderCol = (selected ? SELECTED_BORDER_COLOR : DEFAULT_BORDER_COLOR);
        const fillCol   = (selected ? SELECTED_FILL_COLOR   : DEFAULT_FILL_COLOR);
        const style = new Style(fillCol, borderCol, DEFAULT_BORDER_WIDTH);

        //
        // Creates the Multiplexer and Demultiplexer the correct size
        //
        /* eslint-disable space-in-parens */
    
        const p1 = V(transform.getSize().x/2,  transform.getSize().y/2);
        const p2 = V(transform.getSize().x/2, -transform.getSize().y/2);
        const p3 = V(-transform.getSize().x/2, -transform.getSize().y/2 - MULTIPLEXER_HEIGHT_OFFSET);
        const p4 = V(-transform.getSize().x/2,  transform.getSize().y/2 + MULTIPLEXER_HEIGHT_OFFSET);
        // Renders to the beginning two points again in order to fully connect the last corner
        renderer.draw(new Polygon([p1, p2, p3, p4, p1, p2]), style);
    }

    public override getBounds(): Rect {
        // Get current number of inputs
        const inputs = this.circuit.getPortsFor(this.obj)
            .filter((p) => p.group === DigitalPortGroup.Input).length;
        return super.getBounds().expand(V(0, ((inputs-1)/2*(0.5 - DEFAULT_BORDER_WIDTH/2) + DEFAULT_BORDER_WIDTH/2)));
    }
}
