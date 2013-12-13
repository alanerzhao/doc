module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			options: {
				livereload: true,
			},
			allWtach: {
				files: '**',
				options: {
					livereload: true,
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);

};

