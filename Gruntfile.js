module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//合并文件
		concat: {
			css: {
				src: 'src/css/**.css',
				dest: 'build/css/all.css'
			},
			js: {
				src: 'src/js/**.js',
				dest: 'build/js/all.js'
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
				tasks: ['sass'],
				options: {
					livereload: true,
				}
			},
			allWtach: {
				files: '**',
				options: {
					livereload: true,
				},
			},
		},
		sass: {
			dist: {
				files: {
					'build/css/style.css': 'src/**/*.scss',
				}
			}
		},
		//压缩js
		uglify: {
			build: {
				src: 'build/js/all.js',
				dest: 'build/js/build.min.js'
			}
		},
		//压缩css
		cssmin: {
			build: {
				src: 'build/css/all.css',
				dest: 'build/css/build.min.css'
			}
		},
	});

	// 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认任务
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', "watch:css", "watch:js"]);
	grunt.registerTask('build', ['concat', 'cssmin']);
	//监听css
	grunt.registerTask("Wsass", ['sass', 'watch:sass'])
}

