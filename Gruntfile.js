module.exports = function(grunt) {
	var config = {
		pkg: grunt.file.readJSON('package.json'),
		javascripts: ['frontend/javascripts/**/*.js'],
		server_js: ['backend/**/*.js'],
		views: ['frontend/views/**/*.jade'],
		templates: ['frontend/javascripts/**/*.jade'],
		stylesheets: ['frontend/styles/style.styl'],

		jshint: {
			client: ['Gruntfile.js', '<%= javascripts %>', '!frontend/javascripts/libs/**/*.js'],
			server: ['<%= server_js %>'],
			options: {
				sub: true,
				smarttabs: true,
				multistr: true,
				loopfunc: true
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['<%= javascripts %>'],
				tasks: ['javascripts']
			},
			server_js: {
				files: ['<%= server_js %>'],
				tasks: ['jshint:server'],
				options: {
					livereload: false
				}
			},
			styles: {
				files: ['<%= stylesheets %>'],
				tasks: ['stylus']
			},
			jade_templates: {
				files: ['<%= templates %>'],
				tasks: ['jade:templates']
			},
		},

		jade: {
			templates: {
				files: [{
					expand: true,
					cwd: 'frontend/javascripts/',
					src: ['**/*.jade'],
					dest: 'public/templates/',
					ext: '.html'
				}],
			}
		},

		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': ['frontend/styles/'],
					'compress': true
				},
				files: {
					'public/styles/css/style.css': ['<%= stylesheets %>']
				}
			}
		},		

		copy: {
			libs: {
				
			},
			images: {
				files: [{
					expand: true,
					cwd: 'frontend/images',
					src: ['**'],
					dest: 'public/images'
				}]
			},
			js: {
				files: [{
					expand: true,
					cwd: 'frontend/javascripts/header',
					src: ['**'],
					dest: 'public/javascripts/'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					cwd: 'bower_components/bootstrap/fonts/',
					src: ['**'],
					dest: 'public/styles/fonts/'
				}]
			}
		},

		clean: {
			templates: {
				src: ['public/templates']
			},
			public_js: {
				src: ['public/javascripts']
			},
			public_css: {
				src: ['public/css']
			}
		},

		browserify: {
			// header: {
			// 	dest: 'public/javascripts/headerAll.js',
			// 	src: ['frontend/javascripts/header/*.js']
			// },
			main :{
				dest: 'public/javascripts/main.js',
				src: ['frontend/javascripts/notification/*.js']
			}
		},

		concat: {
			options: {
				separator: '\n'
			},
			js: {
				src: [
					'bower_components/angular/angular.js',
					'bower_components/angular-route/angular-route.js',
					'bower_components/angular-resource/angular-resource.js',
					'bower_components/angular-animate/angular-animate.js',
					'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
					'bower_components/socket.io-client/socket.io.js',
					'bower_components/angular-cookies/angular-cookies.js'
				],
				dest: 'public/javascripts/libs.js',
			},
			css: {
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.css',
					'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
				],
				dest: 'public/styles/css/libs.css'
			}
		}
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	grunt.registerTask('default', ['jshint', 'stylus', 'clean', 'jade', 'concat', 'copy', 'browserify']);
	grunt.registerTask('javascripts', ['jshint', 'browserify']);
	grunt.registerTask('prod', ['default', 'replace']);

};