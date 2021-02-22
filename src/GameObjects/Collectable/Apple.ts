import { Group, Mesh, MeshBasicMaterial, Object3D, SphereGeometry, Vector3 } from "three";
import Collectable from "./CollectableInterace";

export default class Apple extends Group implements Collectable {
    root: Object3D;
    isCollected: boolean = false;

    constructor() {
        super();
        const geometry = new SphereGeometry(0.8, 10, 10);
        const material = new MeshBasicMaterial({ color: "red" });
        const apple = new Mesh(geometry, material);
        this.root = apple;
        this.add(apple);
    }
    getType(): string {
        return 'apple';
    }
    getRoot(): Object3D {
        return this.root;
    }
}