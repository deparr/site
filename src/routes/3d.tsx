// import * as THREE from '~/utils/three';
// import "./3d.css";
//
//
// const TAU = Math.PI * 2;
// export default function Canvas() {
// 	const width = window.innerWidth, height = window.innerHeight;
// 	const camera = new THREE.PerspectiveCamera(70, width / height);
// 	camera.position.z = 60;
//
// 	const scene = new THREE.Scene();
//
// 	const geometry = new THREE.ConeGeometry(1, 3);
// 	const material = new THREE.MeshNormalMaterial();
// 	const bounding_box = new THREE.EdgesGeometry(new THREE.BoxGeometry(60, 60, 60));
// 	const boxmat = new THREE.LineBasicMaterial({});
// 	const boxframe = new THREE.LineSegments(bounding_box, boxmat);
// 	scene.add(boxframe);
//
// 	const boids: THREE.Mesh[] = [];
// 	for (let i = 0; i < 10; i++) {
// 		boids.push(new THREE.Mesh(geometry, material));
// 		boids[i].position.x = Math.random() * 60;
// 		boids[i].position.y = Math.random() * 60;
// 		boids[i].position.z = Math.random() * 60;
// 		boids[i].rotateX(Math.random() * TAU);
// 		boids[i].rotateY(Math.random() * TAU);
// 		boids[i].rotateZ(Math.random() * TAU);
// 		boids[i].up = new THREE.Vector3(boids[i].rotation.x, boids[i].rotation.y, boids[i].rotation.z);
// 		scene.add(boids[i]);
// 	}
//
// 	const renderer = new THREE.WebGLRenderer({ antialias: true });
// 	renderer.setSize(width, height);
// 	let speed = 0.02;
// 	let prev_time = 0.0;
// 	let paused = false;
// 	console.log(boids[0].rotation);
// 	console.log(boids[0].up);
// 	function animate(time: number) {
// 		for (let i = 0; i < boids.length; i++) {
// 			const b = boids[i];
// 			b.position.x += b.up.x * ((time - prev_time) * speed);
// 			b.position.y += b.up.y * ((time - prev_time) * speed);
// 			b.position.z += b.up.z * ((time - prev_time) * speed);
// 			if (b.position.x > 30) {
// 				b.position.x = -30;
// 			} else if (b.position.x < -30) {
// 				b.position.x = 30;
// 				speed = -.02;
// 			}
// 			if (b.position.y > 30) {
// 				b.position.y = -30;
// 			} else if (b.position.y < -30) {
// 				b.position.y = 30;
// 				speed = -.02;
// 			}
// 			if (b.position.z > 30) {
// 				b.position.z = -30;
// 			} else if (b.position.z < -30) {
// 				b.position.z = 30;
// 				speed = -.02;
// 			}
// 		}
// 		renderer.render(scene, camera);
// 		prev_time = time;
// 	}
// 	renderer.setAnimationLoop(animate);
// 	return (
// 		<main>
// 			<button onClick={() => {
// 				if (paused) { renderer.setAnimationLoop(animate); }
// 				else { renderer.setAnimationLoop(null); }
// 				paused = !paused;
// 			}}>
// 				pause
// 			</button>
// 				{renderer.domElement}
// 		</main>
// 	);
//
// }
