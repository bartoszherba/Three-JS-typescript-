import TetrominoInterface from "./TetrominoInterface";
import { Object3D, Group, Box3, Scene, AxesHelper, MathUtils, Vector3 } from "three";

export default class Tetromino implements TetrominoInterface {
    readonly self: Group;
    readonly box: Box3;

    constructor(self: Group) {
        this.self = self;
        this.box = new Box3();
        this.box.setFromObject(this.self);
        const axes: AxesHelper = new AxesHelper(5);
        axes.renderOrder = 1;
        this.self.add(axes);
    }

    attachTo(scene: Scene) {
        scene.add(this.self);
    }

    moveLeft(): void {
        this.self.position.x -= 1;
    }

    moveRight(): void {
        this.self.position.x += 1;
    }

    moveUp(): void {
        this.self.position.y += 1;
    }

    moveDown(): void {
        this.self.position.y -= 1;
    }
      
    moveDeeper(): void {
        this.self.position.z -= 1;
    }

    rotateLeft(): void {
        this.self.rotateY(-MathUtils.degToRad(90));
    }

    rotateRight(): void {
        this.self.rotateY(MathUtils.degToRad(90));
    }

    rotateUp(): void {
        this.self.rotateX(-MathUtils.degToRad(90));
    }

    rotateDown(): void {
        this.self.rotateX(MathUtils.degToRad(90));
    }

    getSelf() {
        return this.self;
    }
  
}