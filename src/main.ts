import * as THREE from 'three';
import { AxesHelper, GridHelper, MathUtils, PerspectiveCamera, Scene, Vector3 } from 'three';
import BoardFactory from './Board/BoardFactory';
import CollisionsCalculator from './CollisionsCalculator';
import Apple from './GameObjects/Collectable/Apple';
import State from './GameObjects/Snake/SnakeState';
import SnakeFactory from './GameObjects/SnakeFactory';
function getRenderer(id: string): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.setAttribute('id', id);

    return renderer;
}

function main() {
    // Initial configuration
    let DEV_MODE: boolean = true;

    const renderer = getRenderer('c');
    document.body.prepend(renderer.domElement);

    const camera: PerspectiveCamera = new PerspectiveCamera(40, 2, 0.1, 300);
    const scene: Scene = new Scene();
    scene.add(camera);
    camera.position.x = 80;
    camera.position.y = 70;
    camera.position.z = 80;

    // camera.position.x = 0;
    // camera.position.y = 2;
    // camera.position.z = -5;
    // camera.rotateY(MathUtils.degToRad(180));

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.y = 50;
    directionalLight1.position.x = 50;
    directionalLight1.lookAt(0, 0, 0);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.y = -50;
    directionalLight2.lookAt(0, 0, 0);
    scene.add(directionalLight1);
    // scene.add(directionalLight2);

    if (DEV_MODE) {
        const axesHelper: AxesHelper = new AxesHelper(5);
        scene.add(axesHelper);
        const size: number = 50;
        const divisions: number = 25;
        const gridHelper: GridHelper = new GridHelper(size, divisions);
        scene.add(gridHelper);
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

    function addApple() {
        const apple = new Apple();
        apple.position.x = MathUtils.randFloat((-board.width + 15) / 2, (board.width - 15) / 2);
        apple.position.z = MathUtils.randFloat((-board.width + 15) / 2, (board.width - 15) / 2);
        apple.position.y + 0.5;

        board.addCollectables(apple);
        scene.add(apple);
    }
    const snake = new SnakeFactory().create(5, '#8BD611');
    snake.state = new State();
    // snake.getHead().add(camera);
    scene.add(camera);
    scene.add(snake);

    const board = new BoardFactory().create(100, 100, '#55d4be');
    scene.add(board);
    addApple();

    document.onkeydown = (e) => {
        console.log(e.key);
        if (e.key == ' ') {
            snake.state.setSpeed(snake.state.getSpeed() + 1);
            // snake.extendBy(2);
        }
        if (e.key == 'ArrowUp') {
            // up arrow
        }
        else if (e.key == 'ArrowDown') {
            // down arrow
        }
        else if (e.key == 'ArrowLeft') {
            if (!snake.state.getMoveLeft()) {
                snake.state.setMoveLeft(true);
            }
        }
        else if (e.key == 'ArrowRight') {
            if (!snake.state.getMoveRight()) {
                snake.state.setMoveRight(true);
            }
        }
    };

    document.onkeyup = (e) => {
        if (e.key == 'ArrowUp') {

        }
        else if (e.key == 'ArrowDown') {
            // down arrow
        }
        else if (e.key == 'ArrowLeft') {
            snake.state.setMoveLeft(false);
        }
        else if (e.key == 'ArrowRight') {
            snake.state.setMoveRight(false);
        }
    };
    const collisionsCalculator = new CollisionsCalculator();
    function render(time): void {
        if (!snake.state.getIsLive()) return;
        snake.move();

        board.getObstacles().forEach(obstacle => {
            if (collisionsCalculator.detectCollisionCubes(obstacle, snake.getHead())) {
                snake.state.setIsLive(false);
            }
        });

        board.getCollectables().forEach(collectable => {
            if (collisionsCalculator.detectCollisionCubes(collectable.getRoot(), snake.getHead())) {
                if (collectable.getType() === 'apple' && !collectable.isCollected) {
                    collectable.isCollected = true;
                    scene.remove(collectable);
                    snake.extendBy(1);
                    snake.state.setSpeed(snake.state.getSpeed() + 0.1);
                    addApple();
                }
            }
           
        });
        snake.getSegments().slice(6).forEach(segment => {
            if (collisionsCalculator.detectCollisionSpheres(segment, snake.getHead())) {
                snake.state.setIsLive(false);
            }
        });
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        requestAnimationFrame(render);
        camera.lookAt(snake.getHead().position);
        renderer.render(scene, camera);
    }



    requestAnimationFrame(render);

    renderer.render(scene, camera);

}
main();
