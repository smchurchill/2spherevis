var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.Geometry();

var points = [
    new THREE.Vector3(0.736087,1.274940,0.402807),
    new THREE.Vector3(0.000000,0.000000,-1.526286),
    new THREE.Vector3(1.472174,0.000000,0.402807),
    new THREE.Vector3(-1.420338,0.253597,-0.497873),
    new THREE.Vector3(0.453966,y:-0.949486,z:1.105414),
    new THREE.Vector3(-0.915225,1.115363,-0.497874),
    new THREE.Vector3(1.083538,0.903080,-0.583045),
    new THREE.Vector3(-0.326438,-1.379865,-0.564766),
    new THREE.Vector3(-0.884288,-1.066278,0.640807),
    new THREE.Vector3(-1.418295,0.492836,0.274045),
    new THREE.Vector3(0.596459,-1.404884,-0.009311),
    new THREE.Vector3(1.154489,0.998308,0.009254)
];    

var faces = [
    new THREE.Face3(0,1,2),
    new THREE.Face3(3,1,2),
    new THREE.Face3(0,4,2),
    new THREE.Face3(0,1,5),
    new THREE.Face3(3,4,2),
    new THREE.Face3(3,1,6),
    new THREE.Face3(0,4,5),
    new THREE.Face3(7,1,5),
    new THREE.Face3(3,4,8),
    new THREE.Face3(7,1,6),
    new THREE.Face3(3,9,6),
    new THREE.Face3(10,4,5),
    new THREE.Face3(7,11,5),
    new THREE.Face3(10,4,8),
    new THREE.Face3(3,9,8),
    new THREE.Face3(7,9,6),
    new THREE.Face3(10,11,5),
    new THREE.Face3(7,11,8),
    new THREE.Face3(10,11,8),
    new THREE.Face3(7,9,8)
];

var material = new THREE.MeshBasicMaterial({color:0x00ff00});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;
camera.lookAt(
    new THREE.Vector3(0,0,0)
);

function render() {
    requestAnimationFrame(render);
    sphere.rotation.x += 0.1;
    sphere.rotation.y += 0.1;
    renderer.render(scene, camera);
}
render();
