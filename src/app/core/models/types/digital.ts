import {Component, ComponentFactory, DefaultComponent} from "./base/Component";
import {DefaultPort, Port, PortFactory}                from "./base/Port";
import {DefaultWire, Wire, WireFactory}                from "./base/Wire";


export type DigitalPort = Port      & { kind: "DigitalPort" };
export type DigitalWire = Wire      & { kind: "DigitalWire" };
export type DigitalNode = Component & { kind: "DigitalNode" };

export type ANDGate = Component & { kind: "ANDGate" };
export type ORGate = Component & { kind: "ORGate" };
export type NORGate = Component & { kind: "NORGate" };
export type Switch  = Component & { kind: "Switch"  };
export type LED     = Component & { kind: "LED", color: string };

export type DigitalComponent =
    | DigitalNode
    | Switch
    | LED
    | ORGate
    | NORGate
    | ANDGate;

export type DigitalObj = DigitalPort | DigitalWire | DigitalComponent;


export const DefaultDigitalComponent: { [C in DigitalComponent as C["kind"]]: ComponentFactory<C> } = {
    "DigitalNode": (id) => ({ ...DefaultComponent(id), kind: "DigitalNode"           }),
    "Switch":      (id) => ({ ...DefaultComponent(id), kind: "Switch"                }),
    "LED":         (id) => ({ ...DefaultComponent(id), kind: "LED", color: "#ffffff" }),
    "ANDGate":     (id) => ({ ...DefaultComponent(id), kind: "ANDGate"               }),
    "ORGate":      (id) => ({ ...DefaultComponent(id), kind: "ORGate"}),
    "NORGate":      (id) => ({ ...DefaultComponent(id), kind: "NORGate"}),
};

export const DefaultDigitalPort: PortFactory<DigitalPort> =
    (id, parent, group, index) => ({ ...DefaultPort(id, parent, group, index), kind: "DigitalPort" });

export const DefaultDigitalWire: WireFactory<DigitalWire> =
    (id, p1, p2) => ({ ...DefaultWire(id, p1, p2), kind: "DigitalWire" });
