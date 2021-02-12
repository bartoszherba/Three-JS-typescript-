export default class State {
    moveLeft: boolean;
    moveRight: boolean;
    speed: number;
    
    constructor(moveLeft: boolean = false, moveRight: boolean = false, speed: number = 1)
    {
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;
        this.speed = speed;
    }

    getMoveLeft(): boolean
    {
        return this.moveLeft;
    }

    getMoveRight(): boolean
    {
        return this.moveRight;
    }

    getSpeed(): number
    {
        return this.speed;
    }
}