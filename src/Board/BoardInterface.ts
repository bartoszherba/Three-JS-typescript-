import { Object3D, Vector3, Color, Mesh, Group } from "three";
import TetrominoInterface from "../Tetromino/TetrominoInterface";

export default interface BoardInterface {
    readonly size: number;
    readonly length: number;
    readonly color: Color;
    petrified: { [deepth: number]: Mesh[] };
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
    getPetrifiedList(): { [deepth: number]: Mesh[] };
    addPetrifiedBlock(deepth: number, block: Mesh): void;
    getRoot(): Group;
    getLayersColors(): Color[];
    getSpace(): Object3D;
    repaint(block: Mesh): void;
}