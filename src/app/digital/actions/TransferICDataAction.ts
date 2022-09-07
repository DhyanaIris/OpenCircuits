import type {Action} from "core/actions/Action";

import type {DigitalCircuitDesigner} from "digital/models/DigitalCircuitDesigner";

import type {ICData} from "digital/models/ioobjects/other/ICData";


export class TransferICDataAction implements Action {
    private readonly target: DigitalCircuitDesigner;

    private readonly data: ICData[];

    public constructor(data1: ICData[], target: DigitalCircuitDesigner) {
        this.target = target;

        // Filter out the ICs that the target doesn't already have
        const data2 = this.target.getICData();
        this.data = data1.filter((ic) => !data2.includes(ic));
    }

    public execute(): Action {
        for (const ic of this.data)
            this.target.addICData(ic);

        return this;
    }

    public undo(): Action {
        for (const ic of this.data)
            this.target.removeICData(ic);

        return this;
    }

    public getName(): string {
        return "Transfer IC Data";
    }
}
