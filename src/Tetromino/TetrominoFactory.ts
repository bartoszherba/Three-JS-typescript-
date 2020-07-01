import TetrominoInterface from "./TetrominoInterface";
import Tetromino from "./Tetromino";
import { Group, Vector3, Color, MeshPhongMaterial, EdgesGeometry, Mesh, MeshBasicMaterial, BoxBufferGeometry, LineSegments, LineBasicMaterial, BufferGeometryUtils, Matrix4 } from "three";
import ShapeInterface from "./ShapeInterface";

export default class TetrominoFactory {

    create(shape: ShapeInterface, color: Color): TetrominoInterface {
        const group: Group = new Group();
        const boxGeo: BoxBufferGeometry = new BoxBufferGeometry(1, 1, 1, 2, 2, 2);
        const boxMat: MeshPhongMaterial = new MeshPhongMaterial({color});

        shape.shape.forEach((vector) => {
            const obj = new Mesh(boxGeo, boxMat);
            obj.position.copy(vector.add(shape.pivot));
            group.add(obj);
        });

        return new Tetromino(group);
    }
}