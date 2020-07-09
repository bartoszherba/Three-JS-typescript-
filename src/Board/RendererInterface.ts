import BoardInterface from "./BoardInterface";

export default interface RendererInterface {
    drawGrid(board: BoardInterface): void;
}