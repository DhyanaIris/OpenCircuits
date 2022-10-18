import {Component} from "./base/Component";
import {Port}      from "./base/Port";
import {Wire}      from "./base/Wire";


export enum DigitalPortGroup {
    Input  = 0,
    Output = 1,
    Select = 2,
}

export type DigitalPort = Port & { kind: "DigitalPort", group: DigitalPortGroup };
export type DigitalWire = Wire & { kind: "DigitalWire" };

export type DigitalNode = Component & { kind: "DigitalNode" };

export type ANDGate = Component & { kind: "ANDGate" };

export type BUFGate = Component & { kind: "BUFGate" };

export type DigitalComponent =
    | DigitalNode
    | ANDGate
    | BUFGate;

export type DigitalObj = DigitalPort | DigitalWire | DigitalComponent;
