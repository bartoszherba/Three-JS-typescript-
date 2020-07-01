import TetrominoInterface from "./TetrominoInterface";
import { Group, Box3, Scene, AxesHelper, MathUtils, Vector3 } from "three";

enum Direction {
    LEFT,
    UP,
    RIGHT,
    DOWN,
}

export default class Tetromino implements TetrominoInterface {
    readonly self: Group;
    readonly box: Box3;

    constructor(self: Group) {
        this.self = self;
        this.box = new Box3();
        this.box.setFromObject(this.self);
        const axes: AxesHelper = new AxesHelper(8);
        axes.renderOrder = 1;
        this.self.add(axes);
    }

    attachTo(scene: Scene) {
        scene.add(this.self);
    }

    moveLeft(): void {
        if (this.canMove(Direction.LEFT)) {
            this.self.position.x -= 1;
        }
    }

    moveRight(): void {
        if (this.canMove(Direction.RIGHT)) {
            this.self.position.x += 1;
        }
    }

    moveUp(): void {
        if (this.canMove(Direction.UP)) {
            this.self.position.y += 1;
        }
    }

    moveDown(): void {
        if (this.canMove(Direction.DOWN)) {
            this.self.position.y -= 1;
        }
    }

    moveDeeper(): void {
        this.self.position.z -= 1;
    }

    rotateLeft(): void {
        this.rotate(Direction.LEFT);
    }

    rotateRight(): void {
        this.rotate(Direction.RIGHT);
    }

    rotateUp(): void {
        this.rotate(Direction.UP);
    }

    rotateDown(): void {
        this.rotate(Direction.DOWN);
    }

    getSelf() {
        return this.self;
    }

    private rotate(direction: Direction) {
        switch (direction) {
            case Direction.LEFT:
                this.self.rotation.y += (MathUtils.degToRad(90));
                break;
            case Direction.RIGHT:
                this.self.rotation.y -= (MathUtils.degToRad(90));
                break;
            case Direction.UP:
                this.self.rotation.x -= (MathUtils.degToRad(90));
                break;
            case Direction.DOWN:
                this.self.rotation.x += (MathUtils.degToRad(90));
                break;
        }
        this.self.updateMatrixWorld(true);

        this.self.traverse((element) => {
            if (element.name.indexOf('element') > -1) {
                const worldPosition = new Vector3();
                element.getWorldPosition(worldPosition);
                switch (direction) {
                    case Direction.LEFT:
                    case Direction.RIGHT:
                        if (Math.round(worldPosition.x) < 0) {
                            this.self.position.x += 1;
                        }
                        if (Math.round(worldPosition.x) > 6) {
                            this.self.position.x -= 1;
                        }
                        break;
                    case Direction.UP:
                    case Direction.DOWN:
                        if (Math.round(worldPosition.y) > 0) {
                            this.self.position.y -= 1;
                        }
                        if (Math.round(worldPosition.y) < -6) {
                            this.self.position.y += 1;
                        }
                        break;
                }
                this.self.updateMatrixWorld(true);
            }
        });
    }

    private canMove(directtion: Direction) {
        let canMove = true;
        this.self.traverse((element) => {
            if (element.name.indexOf('element') > -1) {
                const worldPosition = new Vector3();
                element.getWorldPosition(worldPosition);

                switch (directtion) {
                    case Direction.LEFT:
                        if (Math.round(worldPosition.x) - 1 < 0) {
                            canMove = false;
                        }
                        break;
                    case Direction.RIGHT:
                        if (Math.round(worldPosition.x) + 1 > 6) {
                            canMove = false;
                        }
                        break;
                    case Direction.UP:
                        if (Math.round(worldPosition.y) + 1 > 0) {
                            canMove = false;
                        }
                        break;
                    case Direction.DOWN:
                        if (Math.round(worldPosition.y) - 1 < -6) {
                            canMove = false;
                        }
                        break;
                }

            }
        });

        return canMove;
    }
}