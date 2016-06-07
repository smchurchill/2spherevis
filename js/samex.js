var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.Geometry();
points = [
    new THREE.Vector3(-0.915225,1.115363,-0.497874),
    new THREE.Vector3(1.083538,y:0.903080,z:-0.583045),
    new THREE.Vector3(0.326438,y:-1.379865,z:-0.564766),
    new THREE.Vector3(-0.884288,y:-1.066278,z:0.640807),
    new THREE.Vector3(-1.418295,y:0.492836,z:0.274045),
    new THREE.Vector3(0.000000,y:0.000000,z:-1.526286),
    new THREE.Vector3(1.472174,y:0.000000,z:0.402807),
    new THREE.Vector3(-1.420338,y:0.253597,z:-0.497873),
    new THREE.Vector3(0.453966,y:-0.949486,z:1.105414),
    new THREE.Vector3(0.596459,y:-1.404884,z:-0.009311),
    new THREE.Vector3(1.154489,y:0.998308,z:0.009254),
    new THREE.Vector3(0.736087,y:1.274940,z:0.402807)
];
geometry.vertices.push(points);

var material = new THREE.MeshBasicMaterial({color:0x00ff00});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
}
render();
