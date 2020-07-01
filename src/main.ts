import * as THREE from 'three';
import { WebGLRenderer, Scene, Mesh, SphereGeometry, MeshPhongMaterial, PointLight, Object3D, DirectionalLight, Shape, Color, Box3, Vector3 } from 'three';
import Randomizer from './Tetromino/randomizer';
import TetrominoFactory from './Tetromino/TetrominoFactory';
import TetrominoInterface from './Tetromino/TetrominoInterface';
import StandardShapes from './Tetromino/StandardShapes';
import ShapeInterface from './Tetromino/ShapeInterface';

function getRenderer(id: string): WebGLRenderer {
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.setAttribute('id', id);

    return renderer;
}

function main() {
    const renderer = getRenderer('c');
    document.body.prepend(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
    camera.position.set(3, -3, 31);
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


    const shapeRandomizer: Randomizer = new Randomizer(new StandardShapes());
    let shape: ShapeInterface = shapeRandomizer.rollShape();

    const factory: TetrominoFactory = new TetrominoFactory();
    let tetromino: TetrominoInterface = factory.create(shape, new Color('#FF0000'));

    tetromino.attachTo(scene);

    document.body.addEventListener('keydown', (e) => {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 37: tetromino.moveLeft();
                break;
            case 38: tetromino.moveUp();
                break;
            case 39: tetromino.moveRight();
                break;
            case 40: tetromino.moveDown();
                break;
            case 32: tetromino.moveDeeper();
                break;
            case 65: tetromino.rotateLeft();
                break;
            case 87: tetromino.rotateUp();
                break;
            case 68: tetromino.rotateRight();
                break;
            case 83: tetromino.rotateDown();
                break;

        }
        console.log(tetromino.getSelf().position, 'group position');
    });

    var gridHelper = new THREE.GridHelper( 7, 7 );
    gridHelper.position.set(3,-3,20.5);
    gridHelper.rotateX(THREE.MathUtils.degToRad(90));
    var helper = new THREE.CameraHelper( camera );
    scene.add( helper );
    scene.add( gridHelper );

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

    function render(time): void {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    renderer.render(scene, camera);

}
main();
