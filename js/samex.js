if(!Detector.webgl) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer;

init();
render();

function init() {
    
    container = document.createElement('div');
    document.body.appendChild(container);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 10;
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AmbientLight(0x404040));
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,5,0);
    scene.add(light);
    
    var loader = new THREE.TextureLoader();
    var texture = loader.load('textures/UV_Grid_Sm.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotopy = 16;
    
    var materials = [
        new THREE.MeshLambertMaterial({map: texture}),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1})
    ];

    var points = [
        new THREE.Vector3(0.736087,1.274940,0.402807),
        new THREE.Vector3(0.000000,0.000000,-1.526286),
        new THREE.Vector3(1.472174,0.000000,0.402807),
        new THREE.Vector3(-1.420338,0.253597,-0.497873),
        new THREE.Vector3(0.453966,-0.949486,1.105414),
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
    
    var geometry = new THREE.Geometry();
    geometry.vertices.push(points);
    geometry.faces.push(faces);
    
    var object = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
    scene.add(object);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
