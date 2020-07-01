import TetrominoInterface from "./TetrominoInterface";
import Tetromino from "./Tetromino";
import { Group, Color, MeshPhongMaterial, Mesh, BoxBufferGeometry } from "three";
import ShapeInterface from "./ShapeInterface";

export default class TetrominoFactory {

    create(shape: ShapeInterface, color: Color): TetrominoInterface {
        const group: Group = new Group();
        const boxGeo: BoxBufferGeometry = new BoxBufferGeometry(1, 1, 1, 2, 2, 2);
        const boxMat: MeshPhongMaterial = new MeshPhongMaterial({color});

        let i = 1;
        shape.shape.forEach((vector) => {
            const obj = new Mesh(boxGeo, boxMat);
            obj.position.copy(vector.add(shape.origin));
            obj.name ='element-' + i++;
            group.add(obj);
            group.position.set(3,-3, 20);
        });

        return new Tetromino(group);
    }
}