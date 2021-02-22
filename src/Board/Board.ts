import { BoxGeometry, Color, FrontSide, Group, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";
import Collectable from "../GameObjects/Collectable/CollectableInterace";

export default class Board extends Group {
    width: number;
    depth: number;
    private obstacles: Object3D[] = [];
    private collectables: Collectable[] = [];

    constructor(width: number, depth: number) {
        super();
        this.width = width;
        this.depth = depth;
    }
    
    getObstacles(): Object3D[] {
        return this.obstacles;
    }
    getCollectables(): Collectable[] {
        return this.collectables;
    }
    addObstacles(...obstacles: Object3D[]): void {
        obstacles.forEach(obstacle => {
            this.obstacles.push(obstacle);
        });
    }
    addCollectables(...collectables: Collectable[]): void {
        collectables.forEach(collectable => {
            this.collectables.push(collectable);
        });
    }
}