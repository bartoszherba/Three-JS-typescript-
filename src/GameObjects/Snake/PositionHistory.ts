import { Vector3 } from "three";

export default class PositionHistory {
    history: Vector3[] = [];
    length: number = 5;
    push(entry: Vector3): Vector3 | null {
        let total = this.history.push(entry);
        
        return total > this.length ? this.history.shift() : null;
    }

    getMoveTo(): Vector3 | null {
        if (this.history.length >= this.length) {
            return this.history[0];
        } else {
            return null;
        }
    }
}