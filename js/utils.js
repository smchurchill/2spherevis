function geometryFromJSON(json) {
    // parse JSON
    vertices = [];
    faces = [];
    return generateGeometry(vertices, faces);

}

function generateSphere(vertices, edges, radius) {

    scene.add(new THREE.AxisHelper(r*1.5));

    var baseSphere = new THREE.SphereGeometry( radius, 32, 32 );
    var baseMaterial = new THREE.MeshLambertMaterial( {color: 0x888888} );
    this.sphere = new THREE.Mesh(baseSphere, baseMaterial);
    scene.add(sphere);
    
    for( var i = 0 ; i < vertices.length ; i++ ) {
        var origin = vertices[i].clone();
        var proj = projectOntoMesh(origin, sphere);
        drawLine(origin, proj, new THREE.Color(0xffcc00), true);
    }
    
    for( var i = 0 ; i < edges.length ; i++ ) {
        var P = projectOntoMesh(vertices[edges[i][0]], sphere);
        var Q = projectOntoMesh(vertices[edges[i][1]], sphere);
        drawCurve(createSphereArc(P,Q), new THREE.Color(0xffff00));        
    }
    
    sphere.scale.multiplyScalar(0.99);
}

function greatCircleFunction(P,Q) {
    var angle = P.angleTo(Q);
    return function(t) {
        var X = new THREE.Vector3().addVectors(
            P.clone().multiplyScalar(Math.sin((1-t)*angle)),
            Q.clone().multiplyScalar(Math.sin(    t*angle)))
            .divideScalar(Math.sin(angle));
        return X;        
    };
}

function createSphereArc(P,Q) {
    var sphereArc = new THREE.Curve();
    sphereArc.getPoint = greatCircleFunction(P,Q);
    return sphereArc;
}

function drawCurve(curve, color) {
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = curve.getPoints(100);
    lineGeometry.computeLineDistances;
    var lineMaterial = new THREE.LineBasicMaterial();
    lineMaterial.color = color;
    var line = new THREE.Line(lineGeometry,lineMaterial);
    scene.add(line);

}

function drawLine(P,Q,color,dashed) {
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(P,Q);
    lineGeometry.computeLineDistances();
    if( dashed === undefined || !dashed )
        var lineMaterial = new THREE.LineBasicMaterial();
    else // dashed == true
        var lineMaterial = new THREE.LineDashedMaterial({dashSize: 2, gapSize: 2});
    var line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

}

function projectOntoMesh(point, mesh) {
    var origin = point.clone();
    var direction = point.clone().multiplyScalar(-1);
    var ray = new THREE.Raycaster(origin, direction.normalize());
    var intersection = ray.intersectObject(mesh);
    if(intersection.length > 0)
        return intersection[0].point;
    else
        return null;
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

function addTexturedGeometry(file, geometry) {

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

function init() {
    //SCENE
    scene = new THREE.Scene();

    //CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);
    
    //RENDERER
    if(Detector.webgl)
        renderer = new THREE.WebGLRenderer({antialias: true});
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);
    
    //EVENTS
    window.addEventListener('resize', onWindowResize, false);
    
    //CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    //STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );
    
    //LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100,250,100);
    scene.add(light);
    
    var skyBoxGeometry = new THREE.CubeGeometry(1000,1000,1000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x6666cc, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    controls.update();
    stats.update();
}

function render() {
    /*
    var timer = Date.now()*0.0001;
    camera.position.x = Math.cos(timer)*800;
    camera.position.y = Math.sin(timer)*800;
    
    camera.lookAt(scene.position);
    
    for(var i = 0, l = scene.children.length; i < l; i++ ){
        var object = scene.children[ i ];
        object.rotation.x = timer * 5;
        object.rotation.y = timer * 2.5;
    }
    */
    renderer.render(scene, camera);
}


