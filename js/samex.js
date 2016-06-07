if(!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer;

init();
render();

function init() {
    
    container = document.createElement('div');
    document.body.appendChild(container);
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 400;
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AmbientLight(0x404040));
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,1,0);
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
        new THREE.Vector3(073,127,040),
        new THREE.Vector3(0,0,-152),
        new THREE.Vector3(147,0,40),
        new THREE.Vector3(-142,25,50),
        new THREE.Vector3(45,95,111),
        new THREE.Vector3(-92,112,-50),
        new THREE.Vector3(108,90,-58),
        new THREE.Vector3(-33,-138,-56),
        new THREE.Vector3(-88,-107,64),
        new THREE.Vector3(-142,49,27),
        new THREE.Vector3(60,-140,-1),
        new THREE.Vector3(115,100,1)
    ];    

/*    var faces = [
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
    ];*/
    
    var object = THREE.SceneUtils.createMultiMaterialObject( new THREE.ConvexGeometry(points), materials);
    scene.add(object);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    stats = new Stats();
    container.appendChild(stats.dom);
    
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();

}

function render() {
    var timer = Date.now()*0.0001;
    camera.position.x = Math.cos(timer)*800;
    camera.position.y = Math.sin(timer)*800;
    
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}
