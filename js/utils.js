function geometryFromJSON(json) {
    // parse JSON
    vertices = [];
    faces = [];
    return generateGeometry(vertices, faces);

}

function generateGeometry(vertices, faces) {
    var geometry = new THREE.Geometry();
    geometry.vertices = geometry.vertices.concat(vertices);
    geometry.faces = geometry.faces.concat(faces);
    
    // faceVertexUV methods from ConvexGeometry.js example
    function vertexUv( vertex ) {
        var mag = vertex.length();
        return new THREE.Vector2( vertex.x/mag, vertex.y/mag );
    }
    
    for ( var i = 0; i < geometry.faces.length; i ++ ) {
        var face = geometry.faces[ i ];
        geometry.faceVertexUvs[ 0 ].push( [
            vertexUv( geometry.vertices[ face.a ] ),
            vertexUv( geometry.vertices[ face.b ] ),
            vertexUv( geometry.vertices[ face.c ] )
        ] );
    }
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
}

function addTexturedGeometry(file, geometry, scene) {

    var texture = new THREE.TextureLoader().load(file);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotopy = 16;
    
    var materials = [
        new THREE.MeshLambertMaterial({map: texture}),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1})
    ];
    
    var object = THREE.SceneUtils.createMultiMaterialObject( geometry, materials);
    scene.add(object);
}

function init(scene, camera) {
    
    var container = document.createElement('div');
    document.body.appendChild(container);
    
    camera.position.y = 400;
                     
    scene.add(new THREE.AmbientLight(0x404040));
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,1,0);
    scene.add(light);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    var stats = new Stats();
    container.appendChild(stats.dom);
    
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(rotate=true) {
    requestAnimationFrame(animate);
    render(rotate);
    stats.update();
}

function render(rotate=true) {

    if(rotate) {
        var timer = Date.now()*0.0001;
        camera.position.x = Math.cos(timer)*800;
        camera.position.y = Math.sin(timer)*800;
        
        camera.lookAt(scene.position);
        
        for(var i = 0, l = scene.children.length; i < l; i++ ){
            var object = scene.children[ 0 ];
            object.rotation.x = timer * 5;
            object.rotation.y = timer * 2.5;
        }
    }
    
    renderer.render(scene, camera);
}
