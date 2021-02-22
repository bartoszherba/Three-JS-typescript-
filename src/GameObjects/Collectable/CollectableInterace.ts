import { Object3D } from "three";

export default interface Collectable extends Object3D {
    isCollected: boolean;

    getType(): string;
    getRoot(): Object3D;
}