//Configuration of the grunt setup for the Huge Test Project
module.exports = function(grunt){

		grunt.initConfig({
			concat: {
				options: {
				  separator: ';',
				},
				js:{
			      src: ['public/js/dev/main.js'],
			      dest: 'public/js/main.min.js',
					},
			},
			uglify: {
				options: {
					mangle: false
				},
				my_target: {
					files: {
						'public/js/main.min.js': ['public/js/dev/main.js']
					}
				}
			},
			 jshint: {
				options: {
				    reporter: require('jshint-stylish')
				},

			    all: ['public/Gruntfile.js', 'public/js/dev/*.js']
			  },
			watch:{
				js:{
					files:['public/js/dev/*.js'],
					tasks:['concat','uglify'],
				}
			}

		});

		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		

		grunt.registerTask('default', ['concat','uglify','watch']);
		//grunt.registerTask('default', ['watch:js']);
		grunt.registerTask('check', ['jshint']);
};