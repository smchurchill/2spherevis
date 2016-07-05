var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 10;

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
    
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}
