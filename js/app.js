(function(){
	var app = angular.module('store', [ ]);
	
	app.controller('SphereController', function(){
		this.current = sphere;
	});
	
	var sphere = {
		name: 'Tetrahedron',
		euler: 2,
		faces: 4,
		edges: 6,
		vertices: 4,
		description: "Boundary of the 3-simplex."
	}
})();
