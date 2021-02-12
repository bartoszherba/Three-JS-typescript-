import * as THREE from 'three';
import { AxesHelper, GridHelper, Object3D, PerspectiveCamera, Scene, Vector3 } from 'three';
import State from './GameObjects/Snake/SnakeState';
import SnakeFactory from './GameObjects/SnakeFactory';
function getRenderer(id: string): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.setAttribute('id', id);

    return renderer;
}

function main() {
    // Initial configuration
    let DEV_MODE: boolean = false;

    const renderer = getRenderer('c');
    document.body.prepend(renderer.domElement);

    const camera: PerspectiveCamera = new PerspectiveCamera(40, 2, 0.1, 150);
    const scene: Scene = new Scene();
    scene.add(camera);
    camera.position.x = 30;
    camera.position.y = 30
    camera.position.z = 30
    camera.lookAt(0, 0, 0);
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.y = 50;
    directionalLight1.position.x = 50;
    directionalLight1.lookAt(0, 0, 0);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.y = -50;
    directionalLight2.lookAt(0, 0, 0);
    scene.add(directionalLight1);
    scene.add(directionalLight2);

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

    const snake = new SnakeFactory().create(5, '#8BD611');
    snake.state = new State();

    snake.addToContext(scene);

    document.onkeydown = (e) => {
        console.log(e.key);
        if (e.key == ' ') {
            snake.extendBy(10);
            snake.addToContext(scene);
        }
        if (e.key == 'ArrowUp') {
            // up arrow
        }
        else if (e.key == 'ArrowDown') {
            // down arrow
        }
        else if (e.key == 'ArrowLeft') {
            if (!snake.state.getMoveLeft()) {
                snake.state = new State(true);
            }
        }
        else if (e.key == 'ArrowRight') {
            if (!snake.state.getMoveRight()) {
                snake.state = new State(false, true);
            }
        }
    };

    document.onkeyup = (e) => {
        if (e.key == 'ArrowUp') {
            // up arrow
        }
        else if (e.key == 'ArrowDown') {
            // down arrow
        }
        else if (e.key == 'ArrowLeft') {
            snake.state = new State(false, false);
        }
        else if (e.key == 'ArrowRight') {
            snake.state = new State(false, false);
        }
    };

    let last = 0;
    function render(time): void {
        time = Math.round(Math.round(time) * 0.05);
        if (time !== last) {
            last = time;
            snake.move();
        }
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    requestAnimationFrame(render);

    renderer.render(scene, camera);

}
main();
