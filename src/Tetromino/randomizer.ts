import { Vector3 } from "three";
import ShapesRepositoryInerface from "./ShapesRepositoryInterface";
import ShapeInterface from "./ShapeInterface";

export default class Randomizer {
    shapes: ShapesRepositoryInerface;

    constructor(shapes: ShapesRepositoryInerface) {
        this.shapes = shapes;
    }

    rollShape(): ShapeInterface {
        const shapes = this.shapes.get();

        return shapes[Math.floor(Math.random() * shapes.length)];
    }
}