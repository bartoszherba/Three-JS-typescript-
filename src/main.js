import * as THREE from 'three';

function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const canvas = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('#d92316') });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    const rotval = document.getElementById('rotation');
    let speedMod = 0;
    rotval.addEventListener('change', (e) => {
        speedMod = e.target.value / 1000;
    });

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += speedMod;
        cube.rotation.y += speedMod;
        renderer.render(scene, camera);
    }

    animate();
}

main();
