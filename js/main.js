import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
//import GUI from 'three/addons/libs/lil-gui.module.min.js';

window.addEventListener('resize', onResize, false);

const stats = Stats();
document.body.appendChild( stats.dom );

// Configuración básica del escenario
const scene = new THREE.Scene();

// configuración de la Camara Perspectiva
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0,20,20 );
camera.lookAt(scene.position);

// Configuraciones para el renderizado del escenario
const renderer = new THREE.WebGLRenderer( {antialias:true} );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
document.body.appendChild( renderer.domElement );

const orbitControl = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Crear y agregar un plano
const planeGeometry = new THREE.PlaneGeometry(10000,10000);
const planeMaterial = new THREE.MeshStandardMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//Cargando las texturas completas para la esfera
var textureLoader = new THREE.TextureLoader();
var bmap = new THREE.TextureLoader().load('./images/7.jpg');
var dmap = new THREE.TextureLoader().load('./images/8.jpg')

//Configuraciones de las texturas
const spheraGeometry = new THREE.SphereGeometry(5,32,32);
const spheraMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./images/1.jpg'),
    bumpMap: bmap, 
    bumpScale: 1.3,
    displacementMap: dmap,
    displacementScale: 0.5,
    metalness: 0.2,
    roughness: 0.07
});
const sphere = new THREE.Mesh(spheraGeometry,spheraMaterial);
sphere.position.y = 10;
sphere.castShadow = true;
scene.add(sphere);


const ambientLight = new THREE.AmbientLight(0xaaaaaa);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(20,40,40);
dirLight.castShadow = true;
dirLight.intensity = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 40;
dirLight.shadow.camera.left = -40;
dirLight.shadow.camera.top = 40;
dirLight.shadow.camera.bottom = -40;
dirLight.shadow.camera.width = 1024;
dirLight.shadow.camera.height = 1024;
dirLight.shadow.camera.radius = 4;
dirLight.shadow.camera.bias = -0.0005;

scene.add(dirLight);

animate();

function animate() {
    requestAnimationFrame( animate );
    stats.update();
    orbitControl.update();


    //sphere.rotateY(0.01);
    renderer.render( scene, camera );
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}