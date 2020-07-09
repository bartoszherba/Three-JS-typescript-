import { Scene, Group } from "three";
import BoardInterface from "../Board/BoardInterface";
import { Rotation } from "./Enum/RotationEnum";

export default interface TetrominoInterface {
    moveLeft(): void,
    moveRight(): void,
    moveUp(): void,
    moveDown(): void,
    moveDeeper(): void,
    attachToBoard(board: BoardInterface): void;
    getRoot(): Group;
    getBoard(): BoardInterface;
    petrify(): void;
    rotateOnAxis(axis: Rotation);
}