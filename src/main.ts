import * as THREE from 'three';
import { AxesHelper, GridHelper, PerspectiveCamera, Scene } from 'three';

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

    const camera: PerspectiveCamera = new PerspectiveCamera(40, 2, 0.1, 100);
    const scene: Scene = new Scene();
    scene.add(camera);
    camera.position.x = 10;
    camera.position.y = 10
    camera.position.z = 10
    camera.lookAt(0, 0, 0);

    if (DEV_MODE) {
        const axesHelper: AxesHelper = new AxesHelper(5);
        scene.add(axesHelper);
        const size: number = 5;
        const divisions: number = 10;
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

    function render(time): void {
        time = Math.round(time) * 0.001;
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
