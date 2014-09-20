module.exports = function (grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
                    sourceMap: true
				},
				files: {
					'css/style.css': 'scss/style.scss'
				}
			},
			dist: {
				files: {
					'css/style.css': 'scss/style.scss'
				}
			}
		},

		autoprefixer: {
			single_file: {
				options: {
					browsers: ['last 4 version', 'ie 7' , 'ie 8', 'ie 9'],
                    map: true
				},
				src: 'css/style.css'
			}
		},

		watch: {
			css: {
				files: ['scss/**/*.scss'],
				tasks: ['scss:dev','autoprefixer']
			},

			options: {
				spawn: false
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/style.css',
						'**/*.php',
						'jscripts/build/*.js'
					]
				},
				options: {
					watchTask: true,
                    ghostMode: {
                        forms: false    
                    }
				}
			}
		},

		fontface: {
			dist: {
				options: {
					fontDir: 'fonts',
					template: '@include rf-font-face($font-family: {{font}}, $file: {{font}}, $short-name: {{font}}, $serif: sans);'
				}
			}

		}


	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-fontface');

	// Default task(s).
	grunt.registerTask('style', ['sass:dev', 'autoprefixer']);
	grunt.registerTask('default', ['watch']);

};
