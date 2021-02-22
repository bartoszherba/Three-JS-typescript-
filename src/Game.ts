import { Group } from "three";
import Board from "./Board/Board";
import Snake from "./GameObjects/Snake";

export default class Game {
    private board: Board;
    private player: Snake;
    private score: number = 0;
    private root: Group = new Group();

    constructor(board: Board, player: Snake) {
        this.setPlayer(player);
        this.setBoard(board);
    }

    private setBoard(board: Board) {
        this.board = board;
        this.root.add(board);
    }

    private setPlayer(player: Snake) {
        this.player = player;
        this.root.add(player);
    }
}