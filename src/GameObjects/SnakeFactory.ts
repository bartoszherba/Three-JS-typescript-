import { CircleGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshToonMaterial, SphereGeometry } from "three";
import PositionHistory from "./Snake/PositionHistory";
import Snake from "./Snake";

export default class SnakeFactory {
    create(length: number, color: string): Snake {
        const sGeo = new SphereGeometry(1, 10, 10);
        const sMaterial = new MeshToonMaterial({color: color});
        const snake: Snake = new Snake();
        const firstSegment = new Mesh(sGeo, sMaterial);
        snake.segmentPrototype = firstSegment.clone();

        const eyeGeo = new SphereGeometry(0.5, 10, 10);
        const eyeMaterial = new MeshToonMaterial({color: "#fff"});
        const eye1 = new Mesh(eyeGeo, eyeMaterial);
        const eye2 = new Mesh(eyeGeo, eyeMaterial);
        firstSegment.userData.posHistory = new PositionHistory();
        
        eye1.position.x = 0.7;
        eye1.position.y = 0.7;
        eye2.position.x = -0.7;
        eye2.position.y = 0.7;

        const pupilGeo = new CircleGeometry(0.3, 10);
        const pupilMaterial = new MeshToonMaterial({color: "#000", "side": DoubleSide});
        const pupil1 = new Mesh(pupilGeo, pupilMaterial);
        const pupil2 = new Mesh(pupilGeo, pupilMaterial);
        pupil1.position.z = 0.5;
        pupil2.position.z = 0.5;
        eye1.add(pupil1);
        eye2.add(pupil2);
        firstSegment.add(eye1);
        firstSegment.add(eye2);
        snake.addSegment(firstSegment);

        for (let i = 0; i < length; i++) {
            const segment = new Mesh(sGeo, sMaterial);
            segment.userData.posHistory = new PositionHistory();
            snake.addSegment(segment);
        }

        return snake;
    }
}