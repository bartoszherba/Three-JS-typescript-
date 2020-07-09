import TetrominoInterface from "./TetrominoInterface";
import { Group, AxesHelper, MathUtils, Vector3, BoxBufferGeometry, MeshPhongMaterial, Mesh, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import BoardInterface from "../Board/BoardInterface";
import { Direction } from "./Enum/DirectionEnum";
import { Rotation } from "./Enum/RotationEnum";

export default class Tetromino implements TetrominoInterface {
    readonly root: Group;
    board: BoardInterface;

    constructor(root: Group) {
        this.root = root;
        const axes: AxesHelper = new AxesHelper(8);
        axes.renderOrder = 1;
        this.root.add(axes);
    }

    attachToBoard(board: BoardInterface) {
        board.getRoot().getObjectByName('space').add(this.root);
        this.board = board;
    }

    moveLeft(): void {
        if (this.canMove(Direction.LEFT)) {
            this.root.position.x -= 1;
            this.board.getRoot().dispatchEvent( { type: 'move' } );
        }
    }

    moveRight(): void {
        if (this.canMove(Direction.RIGHT)) {
            this.root.position.x += 1;
            this.board.getRoot().dispatchEvent( { type: 'move' } );
        }
    }

    moveUp(): void {
        if (this.canMove(Direction.UP)) {
            this.root.position.y += 1;
            this.board.getRoot().dispatchEvent( { type: 'move' } );
        }
    }

    moveDown(): void {
        if (this.canMove(Direction.DOWN)) {
            this.root.position.y -= 1;
            this.board.getRoot().dispatchEvent( { type: 'move' } );
        }
    }

    moveDeeper(): void {
        if (this.canMove(Direction.PUSH)) {
            this.root.position.z -= 1;
            this.board.getRoot().dispatchEvent( { type: 'move' } );
        } else {
            this.petrify();
        }
    }

    rotateOnAxis(axis: Rotation) {
        this.rotate(axis);
    }

    getRoot() {
        return this.root;
    }

    getBoard(): BoardInterface {
        return this.board;
    }

    petrify() {
        const tetrominoSpace = this.getBoard().getSpace();
        tetrominoSpace.remove(this.root);
        this.root.traverse((element) => {
            if (element.name.indexOf('element') > -1) {
                const elWorldPosition = new Vector3();
                element.getWorldPosition(elWorldPosition);
                const boxGeo: BoxBufferGeometry = new BoxBufferGeometry(1, 1, 1, 2, 2, 2);
                const boxMat: MeshPhongMaterial = new MeshPhongMaterial({ color: this.getBoard().getLayersColors()[elWorldPosition.z] });
                const petrifiedBlock = new Mesh(boxGeo, boxMat);
                petrifiedBlock.name = 'petrified';
                petrifiedBlock.position.set(Math.round(elWorldPosition.x), Math.round(elWorldPosition.y), Math.round(elWorldPosition.z));
                tetrominoSpace.add(petrifiedBlock);
                this.getBoard().addPetrifiedBlock(Math.round(elWorldPosition.z), petrifiedBlock);
            };
        });

        this.board.getRoot().dispatchEvent( { type: 'petrification' } );
    }

    private rotate(axis: Rotation) {
        switch (axis) {
            case Rotation.X:
                this.root.rotation.x += (MathUtils.degToRad(90));
                break;
            case Rotation.Y:
                this.root.rotation.y += (MathUtils.degToRad(90));
                break;
            case Rotation.Z:
                this.root.rotation.z += (MathUtils.degToRad(90));
                break;
        }
        this.root.updateMatrixWorld(true);

        // Reposition tetromino after rotation to keep in in a stage boundary
        this.root.traverse((element) => {
            if (element.name.indexOf('element') > -1) {
                const elWorldPosition = new Vector3();
                element.getWorldPosition(elWorldPosition);
                if (Math.round(elWorldPosition.x) < 0) {
                    this.root.position.x += 1;
                }
                if (Math.round(elWorldPosition.x) > this.getBoard().getSize() - 1) {
                    this.root.position.x -= 1;
                }
                if (Math.round(elWorldPosition.y) > 0) {
                    this.root.position.y -= 1;
                }
                if (Math.round(elWorldPosition.y) < -this.getBoard().getSize() - 1) {
                    this.root.position.y += 1;
                }
                this.root.updateMatrixWorld(true);
            }
        });
        this.board.getRoot().dispatchEvent( { type: 'move' } );
    }

    private canMove(directtion: Direction, board?: BoardInterface) {
        let canMove = true;
        this.root.traverse((element) => {
            if (element.name.indexOf('element') > -1) {
                const elWorldPosition = new Vector3();
                element.getWorldPosition(elWorldPosition);
                switch (directtion) {
                    case Direction.LEFT:
                        if (Math.round(elWorldPosition.x) - 1 < 0) {
                            canMove = false;
                        }
                        break;
                    case Direction.RIGHT:
                        if (Math.round(elWorldPosition.x) + 1 > this.getBoard().getSize() - 1) {
                            canMove = false;
                        }
                        break;
                    case Direction.UP:
                        if (Math.round(elWorldPosition.y) + 1 > 0) {
                            canMove = false;
                        }
                        break;
                    case Direction.DOWN:
                        if (Math.round(elWorldPosition.y) - 1 < -this.getBoard().getSize() + 1) {
                            canMove = false;
                        }
                        break;
                    case Direction.PUSH:
                        if (Math.round(elWorldPosition.z) - 1 < 0) {
                            canMove = false;
                        }
                        this.board.getRoot().getObjectByName('space').traverse((petrified) => {
                            if (petrified.name.indexOf('petrified') > -1) {
                                if (Math.round(petrified.position.z) === Math.round(elWorldPosition.z -1)
                                    && Math.round(petrified.position.x) === Math.round(elWorldPosition.x)
                                    && Math.round(petrified.position.y) === Math.round(elWorldPosition.y)) {
                                        canMove = false;
                                }
                            }
                           
                        });

                        break;
                }

            }
        });
        
        return canMove;
    }
}