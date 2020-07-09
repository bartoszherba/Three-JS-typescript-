import ShapeInterface from "./ShapeInterface";

export default interface ShapesRepositoryInerface {
    get(): ShapeInterface[];
}