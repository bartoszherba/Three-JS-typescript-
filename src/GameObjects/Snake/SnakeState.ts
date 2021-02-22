export default class State {
    private moveLeft: boolean;
    private moveRight: boolean;
    private speed: number;
    private isLive: boolean;
    readonly maxSpeed = 5;

    constructor(moveLeft: boolean = false, moveRight: boolean = false, speed: number = 1, isLive: boolean = true) {
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;
        this.speed = speed;
        this.isLive = isLive;
    }
    setMoveLeft(isMoving: boolean) {
        this.moveLeft = isMoving;
    }
    getMoveLeft(): boolean {
        return this.moveLeft;
    }
    getMoveRight(): boolean {
        return this.moveRight;
    }
    setMoveRight(isMoving: boolean) {
        this.moveRight = isMoving;
    }
    setSpeed(speed: number) {
        this.speed = speed > this.maxSpeed ? this.maxSpeed : speed;
    }
    getSpeed(): number {
        return this.speed;
    }
    setIsLive(isLive: boolean) {
        this.isLive = isLive;
    }
    getIsLive(): boolean {
        return this.isLive;
    }
}