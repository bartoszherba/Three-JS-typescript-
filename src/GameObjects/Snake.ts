import { MathUtils, Mesh, Object3D } from "three";
import Addible from "../Interfaces/Addible";
import PositionHistory from "./Snake/PositionHistory";
import State from "./Snake/SnakeState";

export default class Snake implements Addible {
    segments: Object3D[] = [];
    state: State = new State();
    segmentPrototype: Mesh;

    addToContext(context: Object3D) {
        this.segments.forEach(i => {
            context.add(i);
        });
    }
    addSegment(segment: Object3D): Snake {
        this.segments.push(segment);
        return this;
    }
    move() {
        this.segments.forEach((segment, i) => {
            if (i === 0) {
                segment.userData.posHistory.push(segment.position.clone());
                segment.translateZ(-0.2);
            } else {
                const prev = this.segments[i - 1];
                const moveTo = prev.userData.posHistory.getMoveTo();
                if (null !== moveTo) {
                    segment.userData.posHistory.push(segment.position.clone());
                    segment.position.set(moveTo.x, moveTo.y, moveTo.z);
                }
            }
        });
        if (this.state.getMoveLeft()) {
            this.turnLeft();
        }
        if (this.state.getMoveRight()) {
            this.turnRight();
        }
    }
    extendBy(factor: number = 1) {
        while(factor) {
            const newSegment = this.segmentPrototype.clone();
            newSegment.userData.posHistory = new PositionHistory();
            this.addSegment(newSegment);
            factor--;
        }
        console.log(this);
    }
    private turnLeft() {
        const s = this.segments[0];
        s.rotateY(MathUtils.degToRad(5));
    }
    private turnRight() {
        const s = this.segments[0];
        s.rotateY(MathUtils.degToRad(-5));
    }
}