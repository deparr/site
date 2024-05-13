import * as THREE from '~/utils/three';
import "./3d.css";

const width = window.innerWidth, height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
function animate(time: number) {
	mesh.rotation.x = time / 1000;
	mesh.rotation.y = time / 1000;

	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

export default function Canvas() {
	return (
		<main>
			{renderer.domElement}
		</main>
	);

}
