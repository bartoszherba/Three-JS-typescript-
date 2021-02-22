import { BackSide, BoxGeometry, FrontSide, Group, MathUtils, Mesh, MeshBasicMaterial, MeshToonMaterial, PlaneGeometry } from "three";
import Board from "./Board";

export default class BoardFactory {
    create(width: number, depth: number, color: string): Board {
        const board = new Board(width, depth);
        const wallHeight = 2;
        const wallWidth = 1;
        const geometry = new PlaneGeometry(width, depth, 1);
        const floorMaterial = new MeshToonMaterial({ color: '#536663', side: FrontSide });
        board.position.y -= 0.5;
        board.add(new Mesh(geometry, floorMaterial));
        const wall = new Group();
        const geo1 = new BoxGeometry(width, wallWidth, wallHeight);
        const geo2 = new BoxGeometry(depth, wallWidth, wallHeight);
        const wallMaterial = new MeshToonMaterial({ color: color });
        const wall1 = new Mesh(geo1, wallMaterial);
        const wall2 = new Mesh(geo1, wallMaterial);
        const wall3 = new Mesh(geo2, wallMaterial);
        const wall4 = new Mesh(geo2, wallMaterial);
        wall1.position.setY(depth / 2 - wallWidth * 0.5);
        wall2.position.setY(-depth / 2 + wallWidth * 0.5);
        wall3.rotateZ(MathUtils.degToRad(90));
        wall3.position.setX(width / 2 - wallWidth * 0.5);
        wall4.rotateZ(MathUtils.degToRad(90));
        wall4.position.setX(-width / 2 + wallWidth * 0.5);
        wall.add(wall1, wall2, wall3, wall4)
        board.add(wall);
        board.rotateX(MathUtils.degToRad(-90));
        board.addObstacles(wall1, wall2, wall3, wall4);
        return board;
    }
}