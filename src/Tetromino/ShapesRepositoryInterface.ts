import { Vector3 } from "three";
import ShapeInterface from "./ShapeInterface";

export default interface ShapesRepositoryInerface {
    get(): ShapeInterface[];
}