import { Vector3, Object3D, Color } from "three";

export default interface ShapeInterface {
    readonly shape: Vector3[],
    readonly pivot: Vector3,
}