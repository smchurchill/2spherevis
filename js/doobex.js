var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
    container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 10 );
	camera.position.y = 5;
	scene = new THREE.Scene();
	var light, object, materials;
	scene.add( new THREE.AmbientLight( 0x404040 ) );
	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 1, 0 );
	scene.add( light );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	materials = [
		new THREE.MeshLambertMaterial( { map: map } ),
		new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 } )
	];

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
    
    object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(points), materials);
    object.position.set(0,0,0);
    scene.add(object);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.dom );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}
function render() {
	var timer = Date.now() * 0.0001;
	camera.position.x = Math.cos( timer ) * 800;
	camera.position.z = Math.sin( timer ) * 800;
	camera.lookAt( scene.position );
	for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
		var object = scene.children[ i ];
		object.rotation.x = timer * 5;
		object.rotation.y = timer * 2.5;
	}
	renderer.render( scene, camera );
}
