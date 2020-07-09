import RendererInterface from "./RendererInterface";
import { LineBasicMaterial, Line, Vector3, BufferGeometry, Object3D, MathUtils } from "three";
import BoardInterface from "./BoardInterface";

export default class DefaultRenderer implements RendererInterface {

    drawGrid(board: BoardInterface): void {
        const material: LineBasicMaterial = new LineBasicMaterial({ color: board.getColor() });
        const uWall = this.getWall(board.getSize(), board.getLength(), material);
        const lWall = uWall.clone();
        lWall.rotateZ(MathUtils.degToRad(-90));
        const rWall = this.getWall(board.getSize(), board.getLength(), material);
        rWall.rotateZ(MathUtils.degToRad(-90));
        rWall.position.x = board.getSize();
        const dWall = this.getWall(board.getSize(), board.getLength(), material);
        dWall.position.y = -board.getSize();
        const backWall = this.getBackWall(board.getSize(), material);
        const grid: Object3D = new Object3D();
        grid.add(uWall, lWall, rWall, dWall, backWall);
        grid.position.add(new Vector3(-0.5, 0.5, -0.5));
        board.root.add(grid);
    }

    private getBackWall(segments: number, material: LineBasicMaterial): Object3D{
        const wall = this.getWall(segments, segments, material);
        wall.rotateX(MathUtils.degToRad(90));

        return wall;
    }

    private getWall(segments: number, depth: number, material: LineBasicMaterial): Object3D {
        const wall: Object3D = new Object3D();

        const xPoints: Vector3[] = [];
        xPoints.push(new Vector3(0, 0, depth));
        xPoints.push(new Vector3(0, 0, 0));
        const xGeometry = new BufferGeometry().setFromPoints(xPoints);

        const zPoints: Vector3[] = [];
        zPoints.push(new Vector3(0, 0, 0));
        zPoints.push(new Vector3(segments, 0, 0));
        const zGeometry = new BufferGeometry().setFromPoints(zPoints);


        const rotation = MathUtils.degToRad(90);
        let x = 0;

        while (x <= segments) {
            const zLine: Line = new Line(xGeometry, material);
            zLine.position.x = x;
            wall.add(zLine);
            x++;
        }

        let z = 0;
        while (z <= depth) {
            const xLine: Line = new Line(zGeometry, material);
            xLine.position.z = z;
            wall.add(xLine);
            z++;
        }

        return wall;
    }
}