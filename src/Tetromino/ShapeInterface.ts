import { Vector3 } from "three";

export default interface ShapeInterface {
    readonly shape: Vector3[],
    readonly origin: Vector3,
}