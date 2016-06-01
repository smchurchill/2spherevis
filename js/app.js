(function(){
	var app = angular.module('example', [ ]);
	
	app.controller('ExampleController', function(){
		this.spheres = triangulations;
	});
	
	var triangulations = [
		{
			name: 'Tetrahedron',
			euler: 2,
			faces: 4,
			edges: 6,
			vertices: 4,
			description: "Boundary of the 3-simplex.",
			isExample: true,
			isComputable: false,
		},
		{
			name: 'Octohedron',
			euler: 2,
			faces: 8,
			edges: 12,
			vertices: 6,
			description: "Dual to the cube.",
			isExample: false,
			isComputable: true,
		},
	]
})();
