import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(8, 1, 32, 200);
const material = new THREE.MeshStandardMaterial({ color: 0x121212 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(700));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

// img

const robbTexture = new THREE.TextureLoader().load('/img/rob20.png');

const rob = new THREE.Mesh(new THREE.BoxGeometry(3*0.8, 3*0.8, 3*0.8), new THREE.MeshBasicMaterial({ map: robbTexture }));

scene.add(rob);

// circleObject


const circleTexture = new THREE.TextureLoader().load('/img/eartha.jpg');
const normalTexture = new THREE.TextureLoader().load('/img/design-patterns.jpg');

const circleObject
 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: circleTexture,
    normalMap: normalTexture,
  })
);

scene.add(circleObject
  );

circleObject
.position.z = 30;
circleObject
.position.setX(-10);

rob.position.z = -5;
rob.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  circleObject
  .rotation.x += 0.05;
  circleObject
  .rotation.y += 0.075;
  circleObject
  .rotation.z += 0.05;

  rob.rotation.y += 0.01;
  rob.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  circleObject
  .rotation.y += 0.001

  // controls.update();

  renderer.render(scene, camera);
}

animate();