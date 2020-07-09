import { Scene, Group } from "three";
import BoardInterface from "../Board/BoardInterface";

export default interface TetrominoInterface {
    moveLeft(): void,
    moveRight(): void,
    moveUp(): void,
    moveDown(): void,
    moveDeeper(): void,
    rotateLeft(): void,
    rotateRight(): void,
    rotateUp(): void,
    rotateDown(): void,
    attachToBoard(board: BoardInterface): void;
    getRoot(): Group;
    getBoard(): BoardInterface;
    petrify(): void;
}