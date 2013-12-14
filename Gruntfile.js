module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//合并文件
		concat: {
			css: {
				src: 'src/css/**.css',
				dest: 'build/css/main.css'
			},
			js: {
				src: 'src/js/**.js',
				dest: 'build/js/main.js'
			}
		},
		watch: {
			css: {
				files: 'src/**/*.css',
				tasks: ['concat', 'cssmin'],
				options: {
					livereload: true,
				}
			},
			js: {
				files: 'src/**/*.js',
				tasks: ['concat', 'uglify'],
				options: {
					livereload: true,
				}
			},
			sass: {
				files: 'src/**/*.scss',
				//如果有compass框架
				tasks: ['sass', 'compass'],
				options: {
					livereload: true,
				}
			},
			//监听所有文件
			allWtach: {
				files: '**',
				options: {
					livereload: true,
				},
			},
		},
		//sass
		sass: {
			dist: {
				files: {
					'build/css/style.css': 'src/**/*.scss',
				}
			}
		},
		compass: { // Task
			dev: { // Another target
				options: {
					sassDir: 'src/sass',
					cssDir: 'src/css',
					environment: 'production',
					outputStyle: 'expanded'
				}
			}
		},
		//压缩js
		uglify: {
			build: {
				src: 'build/js/main.js',
				dest: 'build/js/main.min.js'
			}
		},
		//压缩css
		cssmin: {
			build: {
				src: 'build/css/main.css',
				dest: 'build/css/main.min.css'
			}
		},
	});

	// 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认任务
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', "watch:css", "watch:js","watch:sass"]);
	
	//构建任务
	grunt.registerTask('build', ['concat', 'cssmin', 'uglify']);
	
	//监听css
	grunt.registerTask("sass", ['sass', 'watch:sass']);
}

