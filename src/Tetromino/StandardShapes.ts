import { Vector3, Object3D } from "three";
import ShapesRepositoryInerface from "./ShapesRepositoryInterface";
import ShapeInterface from "./ShapeInterface";
import Shape from "./Shape";

export default class StandardShapes implements ShapesRepositoryInerface {
    get(): ShapeInterface[] {
        const block1x1 = new Shape([new Vector3(0, 0, 0)], new Vector3(0, 0, 0));
        const block2x2 = new Shape([new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, -1, 0), new Vector3(1, -1, 0)], new Vector3(0, 0, 0));
        const block1x4 = new Shape([new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(2, 0, 0), new Vector3(3, 0, 0)], new Vector3(-1, 0, 0));
        const blockL = new Shape([new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, -1, 0), new Vector3(0, -2, 0)], new Vector3(0, 1, 0));
        const blockT = new Shape([new Vector3(1, 0, 0), new Vector3(0, -1, 0), new Vector3(1, -1, 0), new Vector3(2, -1, 0)], new Vector3(-1, 1, 0));
        const blockS = new Shape([new Vector3(0, -1, 0), new Vector3(1, -1, 0), new Vector3(1, 0, 0), new Vector3(2, 0, 0)], new Vector3(-1, 0, 0));

        return [block1x1, block2x2, block1x4, blockL, blockT, blockS];
    }
}