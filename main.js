
import * as THREE from 'three'
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import starsTexture from './src/textures/stars.jpg';
import sunTexture from './src/textures/sun.jpg';
import earthTexture from './src/textures/earth_atmos_4096.jpg';
import marsTexture from './src/textures/mars.jpg';
import jupiterTexture from './src/textures/jupiter.jpg';
import neptuneTexture from './src/textures/neptune.jpg';
import moonTexture from './src/textures/moon_1024.jpg';
import venusTexture from './src/textures/venus.jpg';
import saturnTexture from './src/textures/saturn.jpg';
import saturnRingTexture from './src/textures/saturn_ring.png';

//Scene
const scene = new THREE.Scene();



//background
//const spaceTexture = new THREE.TextureLoader().load('./src/images/universe.png');
//scene.background=spaceTexture;
//or
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

//////////////////////////////solar system

//create Planet Function 
function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);


const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const neptune = createPlanete(7, neptuneTexture, 200);
const moon = createPlanete(2, moonTexture, 200);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    moon.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);

    neptune.mesh.rotateY(0.032);


    //Around-sun-rotation
    moon.obj.rotateY(0.004);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    neptune.obj.rotateY(0.0001);


    renderer.render(scene, camera);
}

//////////////////////////////solar system

// //create a sphere (EARTH)
// const geometry = new THREE.SphereGeometry( 4, 64, 64 ); 
// const earthTexture = new THREE.TextureLoader().load('./src/textures/earth_atmos_4096.jpg');
// //{ color: "#cc1d02" , roughness:0.3}
// const material = new THREE.MeshStandardMaterial( {map:earthTexture}); 
// const sphere = new THREE.Mesh( geometry, material ); 
// scene.add( sphere );

// //create a sphere (MOON)
// const geometryMoon = new THREE.SphereGeometry( 2, 64, 64 ); 
// const moonTexture= new THREE.TextureLoader().load('./src/textures/moon_1024.jpg');
// const materialMoon = new THREE.MeshStandardMaterial( {map:moonTexture}); 
// const sphereMoon = new THREE.Mesh( geometryMoon, materialMoon ); 
// sphereMoon.position.x=-20;
// scene.add( sphereMoon );

// //create a sphere (SUN)
// const geometrySun= new THREE.SphereGeometry( 10, 64, 64 ); 
// const sunTexture= new THREE.TextureLoader().load('./src/textures/sun.png');
// const materialSun = new THREE.MeshStandardMaterial( {map:sunTexture}); 
// const sphereSun = new THREE.Mesh( geometrySun, materialSun ); 
// sphereSun.position.x=-70;
// sphereSun.position.y=10;
// scene.add( sphereSun );

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff,1,100,0);
light.position.set(-40,0,0);
light.intensity=30;
scene.add(light);

//SpotLight
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 0, 10, 10 );
// scene.add( spotLight );

//Ambient light
const ambientLight = new THREE.AmbientLight( 0x333333 ); // soft white light
ambientLight.intensity=5;
scene.add( ambientLight );

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,1000);
//camera.position.z = 150;
camera.position.set(-90, 140, 140);
scene.add(camera);

//Rendering
const canvas =document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera);

//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true; //smooth movement
//controls.enablePan = false; //drag
//controls.enableZoom = false; //zoom
//controls.autoRotate = true;
//controls.autoRotateSpeed= 3;

//Resize page
window.addEventListener('resize',() => {
    //Update sizes
    sizes.width= window.innerWidth
    sizes.height=window.innerHeight

    //update camera
    
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height);
    
})

const loop = () => {
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
    
  
}

loop()
renderer.setAnimationLoop(animate);
//timeline
const timeline = gsap.timeline({defaults: {duration:1}});
//timeline.fromTo(sphere.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
timeline.fromTo('nav',{y:'-100%'},{y:'0%'})
timeline.fromTo('.title',{opacity:0},{opacity:1})

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( './src/interstelar.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});