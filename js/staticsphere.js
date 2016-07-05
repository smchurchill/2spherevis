var scene, camera;
var container, stats, renderer, controls;

var vertices = [];
var edges = [];
var faces = [];
var radius = 1;
          
populate();		    
init();
generateSphere(vertices, edges, radius);
animate();
