import BoardInterface from "./BoardInterface";
import { Vector3, Color, Mesh, Group } from "three";
import RendererInterface from "./RendererInterface";
import DefaultRenderer from "./DefaultRenderer";
import TetrominoInterface from "../Tetromino/TetrominoInterface";

export default class DefaultBoard implements BoardInterface {
    size: number;
    length: number;
    origin: Vector3;
    color: Color;
    score: number;
    tetromino: TetrominoInterface;
    petrified: any;
    root: Group;
    tetrominoSpace: Group;
    layersColors: Color[] = [];

    constructor(size: number = 7, length: number = 20, color?: Color, renderer?: RendererInterface) {
        this.size = size;
        this.length = length;
        this.color = color || new Color('#3afd9c');
        this.root = new Group();
        this.tetrominoSpace = new Group();
        this.tetrominoSpace.name = 'space';
        this.root.add(this.tetrominoSpace);
        for (let i = 1; i <= length; i++) {
            this.layersColors.push(new Color('#' + Math.floor(Math.random() * 16777215).toString(16)));
        }
        renderer = renderer || new DefaultRenderer();
        renderer.drawGrid(this);
    }

    getRoot(): Group {
        return this.root;
    }

    setActiveTetromino(tetromino: TetrominoInterface): void {
        this.tetromino = tetromino;
    }

    getActiveTetromino(): TetrominoInterface {
        return this.tetromino;
    }

    addPetrifiedBlock(block: Mesh): void {
        throw new Error("Method not implemented.");
    }

    getPetrifiedList(): Mesh[] {
        return this.petrified;
    }

    getSize(): number {
        return this.size;
    }

    getLength(): number {
        return this.length;
    }

    getOrigin(): Vector3 {
        return this.origin;
    }

    getColor(): Color {
        return this.color;
    }

    getLayersColors(): Color[] {
        return this.layersColors;
    }
}