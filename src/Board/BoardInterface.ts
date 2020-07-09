import { Object3D, Vector3, Color, Mesh, Group } from "three";
import TetrominoInterface from "../Tetromino/TetrominoInterface";

export default interface BoardInterface {
    readonly size: number;
    readonly length: number;
    readonly color: Color;
    readonly petrified: Object3D[];
    readonly layersColors: Color[];
    readonly tetromino: TetrominoInterface;
    readonly root: Group;
    readonly tetrominoSpace: Group;
    score: number;

    getSize(): number;
    getLength(): number;
    getColor(): Color;
    setActiveTetromino(tetromino: TetrominoInterface): void;
    getActiveTetromino(): TetrominoInterface;
    getPetrifiedList(): Mesh[];
    addPetrifiedBlock(block: Mesh): void;
    getRoot(): Group;
    getLayersColors(): Color[];
}