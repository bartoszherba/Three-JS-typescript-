import ShapeInterface from "./ShapeInterface";
import { Vector3, Object3D, Color } from "three";

export default class Shape implements ShapeInterface {
    shape: Vector3[];
    pivot: Vector3;

    constructor(shape: Vector3[], pivot: Vector3) {
        this.shape = shape;
        this.pivot = pivot;
    }
}