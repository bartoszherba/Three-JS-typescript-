import { Scene } from "three";

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
    attachTo(scene: Scene): void,
    getSelf()
}