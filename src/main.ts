import * as THREE from 'three';
import { WebGLRenderer, Scene, Mesh, SphereGeometry, MeshPhongMaterial, PointLight, Object3D, DirectionalLight, Shape, Color, Box3, Vector3, EventDispatcher } from 'three';
import Randomizer from './Tetromino/randomizer';
import TetrominoFactory from './Tetromino/TetrominoFactory';
import TetrominoInterface from './Tetromino/TetrominoInterface';
import StandardShapes from './Tetromino/StandardShapes';
import ShapeInterface from './Tetromino/ShapeInterface';
import DefaultBoard from './Board/DefaultBoard';
import { Rotation } from './Tetromino/Enum/RotationEnum';

function getRenderer(id: string): WebGLRenderer {
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.setAttribute('id', id);

    return renderer;
}

function main() {
    const renderer = getRenderer('c');
    document.body.prepend(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
    const scene = new THREE.Scene();
    const light1: DirectionalLight = new DirectionalLight('#fff', 0.7);
    const light2: DirectionalLight = new DirectionalLight('#fff', 0.5);
    const light3: DirectionalLight = new DirectionalLight('#fff', 0.5);

    light1.position.set(0, 0, 30);
    light1.lookAt(0, 0, 0);
    light2.position.set(50, 50, -10);
    light2.lookAt(0, 0, 0);
    light3.position.set(-50, -50, -10);
    light3.lookAt(0, 0, 0);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    const board: DefaultBoard = new DefaultBoard(5, 15);
    scene.add(board.getRoot());

    camera.position.set(Math.floor(board.getSize() / 2), -Math.floor(board.getSize() / 2), board.getLength() + 8);

    const shapeRandomizer: Randomizer = new Randomizer(new StandardShapes());
    const factory: TetrominoFactory = new TetrominoFactory();


    createNewTetromino();

    document.body.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 37: board.getActiveTetromino().moveLeft();
                break;
            case 38: board.getActiveTetromino().moveUp();
                break;
            case 39: board.getActiveTetromino().moveRight();
                break;
            case 40: board.getActiveTetromino().moveDown();
                break;
            case 32: board.getActiveTetromino().moveDeeper();
                break;
            case 65: board.getActiveTetromino().rotateOnAxis(Rotation.Z);
                break;
            case 68: board.getActiveTetromino().rotateOnAxis(Rotation.Y);
                break;
            case 83: board.getActiveTetromino().rotateOnAxis(Rotation.X);
                break;
        }
    });

    addNewTetromino();

    function addNewTetromino() {
        let tetromino = createNewTetromino();
        console.log(Math.floor(board.getSize()) / 2);
        tetromino.getRoot().position.set(Math.floor(board.getSize() / 2), -Math.floor(board.getSize() / 2), board.getLength() - 1);
        tetromino.attachToBoard(board);
        board.setActiveTetromino(tetromino);
    }

    function createNewTetromino(): TetrominoInterface {
        let shape: ShapeInterface = shapeRandomizer.rollShape();

        return factory.create(shape, new Color('#FF0000'));
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }

        return needResize;
    }

    board.getRoot().addEventListener('petrification', function (event) {
        const petrified = board.getPetrifiedList();

        for (let i = 0; i < board.getLength(); i++) {
            const totalPetrified = petrified[i].length;

            if (totalPetrified >= Math.pow(board.getSize(), 2)) {
                petrified[i].forEach((block: Mesh) => {
                    board.getSpace().remove(block);
                });
                petrified[i] = [];
                board.petrified = petrified;
            }
        }

        for (let i = 0; i < board.getLength(); i++) {
            if (petrified[i].length === 0) {
                if (petrified[i + 1]) {
                    petrified[i] = petrified[i + 1];
                    petrified[i + 1] = [];
                }
            }
            petrified[i].forEach((block: Mesh) => {
                block.position.z = i;
                board.repaint(block);
            });
        }

        addNewTetromino();

        renderer.render(scene, camera);
    });

    board.getRoot().addEventListener('move', function (event) {
        renderer.render(scene, camera);
    });

    let total = 0;
    function render(time): void {
        time = Math.round(time) * 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        if (time - total >= 1) {
            board.getActiveTetromino().moveDeeper();
            renderer.render(scene, camera);
            total++;
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    renderer.render(scene, camera);

}
main();
