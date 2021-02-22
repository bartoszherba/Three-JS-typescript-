import { AxesHelper, Group, MathUtils, Mesh, Object3D } from "three";
import PositionHistory from "./Snake/PositionHistory";
import State from "./Snake/SnakeState";

export default class Snake extends Group {
    segments: Object3D[] = [];
    state: State = new State();
    segmentPrototype: Mesh;

    addSegment(segment: Object3D): Object3D {
        const last = this.getLastSegment();
        if (last) {
            segment.position.set(last.position.x, last.position.y, last.position.z);
        }
        this.segments.push(segment);
        this.add(segment);

        return segment;
    }
    getSegments(): Object3D[] {
        return this.segments;
    }
    move() {
        if (!this.state.getIsLive()) {
            return;
        }
        this.segments.forEach((segment, i) => {
            if (i === 0) {
                segment.userData.posHistory.push(segment.position.clone());
                segment.translateZ(this.state.getSpeed() / 10);
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
        while (factor) {
            const newSegment = this.segmentPrototype.clone();
            newSegment.userData.posHistory = new PositionHistory();
            this.addSegment(newSegment);
            factor--;
        }
    }
    getHead(): Object3D {
        return this.segments[0];
    }
    private turnLeft(): void {
        const s = this.segments[0];
        s.rotateY(MathUtils.degToRad(2));
    }
    private turnRight(): void {
        const s = this.segments[0];
        s.rotateY(MathUtils.degToRad(-2));
    }
    private getLastSegment(): Object3D | null {
        return this.segments[this.segments.length - 1];
    }
}