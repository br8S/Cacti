import * as THREE from '/build/three.module.js';
import {GLTFLoader} from '/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';

var scene, camera, renderer, alight, hlight, light, light2, light3, light4, cacti;
var isMouseDown = false;



function init(){

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 500 , 5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 800;
    camera.position.y = 0;
    camera.position.z = 800;

    // alight = new THREE.AmbientLight (0x404040, 10);
    // scene.add( alight );

    hlight = new THREE.HemisphereLight(0xc4c4c4, 0x080820, 4)
    scene.add(hlight);

    light = new THREE.SpotLight(0xc4c4c4, 1);
    light.position.set(0,300,500);
    scene.add(light);

    light2 = new THREE.SpotLight(0xc4c4c4, 1);
    light2.position.set(500,100,0);
    scene.add(light2);

    light3 = new THREE.SpotLight(0xc4c4c4, 1);
    light3.position.set(0,100,-500);
    scene.add(light3);

    light4 = new THREE.SpotLight(0xc4c4c4, 1);
    light4.position.set(-500,300,0);
    scene.add(light4);

    /*
    light = new THREE.SpotLight(0xF8F8FF, 1); //cyan: E0FFFF pink: D8BFD8 FFE4B5 F8F8FF
    light.position.set(-50,50,50);
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024*4;
    light.shadow.mapSize.height = 1024*4;
    scene.add( light );
    */

    renderer = new THREE.WebGLRenderer({antialias:false,alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.querySelector('.jsscene').appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;

        camera.updateProjectionMatrix();
    }) 

    let loader = new GLTFLoader();
    loader.load('lime.glb', function(gltf){
        cacti = gltf.scene.children[0];
        cacti.scale.set(8.5, 8.5, 8.5);
        cacti.rotation.z = 55;
        cacti.rotation.y = -25;
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    })

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);
    controls.enableZoom = false;
    controls.enablePan = false;

    animate();
}

function onMouseDown(){
    isMouseDown = true;
    console.log("mouseddown");
}

function onMouseUp(){
    isMouseDown = false;
}

function animate(){
    requestAnimationFrame(animate);

    if(!isMouseDown){
        cacti.rotation.z -= 0.003;
    }

    light.position.set( 
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
    );

    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;


}

init();