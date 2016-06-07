var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 50);

var renderer = new THREE.webGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.canvas.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color:0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scence.add(cube);

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
