'use strict';
/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var framework7 = {
        filename: 'framework7'
    };

    // List of js files to concatenate
   
    var jsQualime = ['srcQualyme/js/*.js', 'srcQualyme/js/**/*.js', 'srcQualyme/js/**/**/*.js'];

   


    var jsFilesList = [
        'src/js/wrap-start.js',
        'src/js/f7-intro.js',
        'src/js/views.js',
        'src/js/navbars.js',
        'src/js/searchbar.js',
        'src/js/xhr.js',
        'src/js/pages.js',
        'src/js/modals.js',
        'src/js/panels.js',
        'src/js/messages.js',
        'src/js/swipeout.js',
        'src/js/sortable.js',
        'src/js/smart-select.js',
        'src/js/pull-to-refresh.js',
        'src/js/infinite-scroll.js',
        'src/js/tabs.js',
        'src/js/fast-clicks.js',
        'src/js/clicks.js',
        'src/js/resize.js',
        'src/js/forms-handler.js',
        'src/js/push-state.js',
        'src/js/slider.js',
        'src/js/photo-browser.js',
        'src/js/notifications.js',
        'src/js/plugins.js',
        'src/js/router.js',
        'src/js/init.js',
        'src/js/f7-outro.js',
        'src/js/dom.js',
        'src/js/dom-utils.js',
        'src/js/dom-ajax.js',
        'src/js/dom-export.js',
        'src/js/proto-support.js',
        'src/js/proto-device.js',
        'src/js/proto-plugins.js',
        'src/js/wrap-end.js',
    ];

    // Project configuration.
    grunt.initConfig({
        framework7: framework7,
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            ' * <%= pkg.name %> <%= pkg.version %>\n' +
            ' * <%= pkg.description %>\n' +
            ' *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>, Ignacio Medina Castillo \n' +

            ' *\n' +
            ' * Released on: <%= grunt.template.today("mmmm d, yyyy") %>\n' +
            '*/\n',

        // Task configuration.
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ''
                }
            }
        },
        open: {
            kitchen: {
                path: 'http://localhost:3000/kitchen-sink'
            }
        },
        less: {
            build: {
                options: {
                    paths: ['less'],
                    cleancss: false
                },
                files: {
                    'build/css/framework7.css' : ['src/less/framework7.less']
                }
            },
            qualyme: {
                options: {
                    paths: ['less'],
                    cleancss: false
                },
                files: {
                    // 'build/css/qualyme.css' : ['srcQualyme/less/*.less', 'srcQualyme/less/**/*.less', 'srcQualyme/less/**/**/*.less'],
                    'build/css/qualyme.ios.css' : ['srcQualyme/less/*.less', 'srcQualyme/less/**/*.less', 'srcQualyme/less/**/**/*.less'],
                    // 'build/css/qualyme.material.css' : ['srcQualyme/less/*.less', 'srcQualyme/less/**/*.less', 'srcQualyme/less/**/**/*.less']
                }
            },
            dist: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'dist/css/framework7.min.css' : ['src/less/framework7.less']
                }
            },
            kitchen: {
                options: {
                    paths: ['kitchen-sink/less/'],
                    cleancss: false
                },
                files: {
                    'kitchen-sink/css/kitchen-sink.css' : 'kitchen-sink/less/kitchen-sink.less'
                }
            },
            examples: {
                options: {
                    cleancss: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'examples/tab-bar/less/',
                        src: ['*.less'],
                        dest: 'examples/tab-bar/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view/less/',
                        src: ['*.less'],
                        dest: 'examples/split-view/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view-panel/less/',
                        src: ['*.less'],
                        dest: 'examples/split-view-panel/css/',
                        ext: '.css'
                    }
                ]
            },
            apps: {
                options: {
                    cleancss: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'apps/weather7/less/',
                        src: ['*.less'],
                        dest: 'apps/weather7/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'apps/todo7/less/',
                        src: ['*.less'],
                        dest: 'apps/todo7/css/',
                        ext: '.css'
                    },
                ]
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,
                process: function (src, filename) {
                    let indentSize = 23;
                    if (filename.indexOf('.js') >= 0) {
                        filename = filename.split("/").pop();
                      
                        
                        src = grunt.util.normalizelf(src);
                        return src.split(grunt.util.linefeed).map(function (line,lineNum) {
                            let numberAndFilename = ( filename + ":" + lineNum + " ".repeat(indentSize)).substring(0,indentSize);
                            return "/*" + numberAndFilename + " */ " + line;
                        }).join(grunt.util.linefeed);
                    }
                    else return src;
                }
            },
            classes:{
                src: ["PYC/*.js","PYC/**/*.js","PYC/**/**/*.js"],
                dest: "build/js/WGG_Classes.js"
            },
        
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['dist/js/<%= framework7.filename %>.js'],
                dest: 'dist/js/<%= framework7.filename %>.min.js',
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: [ 'srcQualyme/*.js', 'srcQualyme/js/clases/*.js','srcQualyme/js/clases/**/*.js']
            }
        },
        
        watch: {
            build: {
                files: ['src/**'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            },
            kitchen: {
                files: ['kitchen-sink/jade/**', 'kitchen-sink/less/**'],
                tasks: ['jade:kitchen', 'less:kitchen'],
                options: {
                    livereload: true
                }
            },
            examples: {
                files: [
                    'examples/tab-bar/jade/**', 'examples/tab-bar/less/**',
                    'examples/split-view/jade/**', 'examples/split-view/less/**',
                    'examples/split-view-panel/jade/**', 'examples/split-view-panel/less/**'
                ],
                tasks: ['jade:examples', 'less:examples'],
                options: {
                    livereload: true
                }
            },
            apps: {
                files: [
                    'apps/weather7/jade/**', 'apps/weather7/less/**',
                    'apps/todo7/jade/**', 'apps/todo7/less/**',
                ],
                tasks: ['jade:apps', 'less:apps'],
                options: {
                    livereload: true
                }
            }
        },
        jade: {
            build: {
                options: {
                    pretty: true,
                },
                files: [{
                    expand: true,
                    cwd: 'srcQualyme/templates/',
                    src: ['*.jade'],
                    dest: 'build/',
                    ext: '.html'
                }]
            },
            kitchen: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'kitchen-sink/jade/',
                    src: ['*.jade'],
                    dest: 'kitchen-sink/',
                    ext: '.html'
                }]
            },
            examples: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'examples/tab-bar/jade/',
                        src: ['*.jade'],
                        dest: 'examples/tab-bar/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view/jade/',
                        src: ['*.jade'],
                        dest: 'examples/split-view/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view-panel/jade/',
                        src: ['*.jade'],
                        dest: 'examples/split-view-panel/',
                        ext: '.html'
                    },
                    
                ]
            },
            apps: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'apps/weather7/jade/',
                        src: ['*.jade'],
                        dest: 'apps/weather7/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'apps/todo7/jade/',
                        src: ['*.jade'],
                        dest: 'apps/todo7/',
                        ext: '.html'
                    },
                ]
            }
        },
        copy: {
            toAndroid: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: '../QualimeApp/www/'
                    }
                ]
            },
            toEclipseWorkspace: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: '../workspace/MainActivity/assets/www/'
                    }
                ]
            },
            build: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['img/**'],
                        dest: 'build/'
                    },
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: 'dist/'
                    }
                ]
            },
        },
    });

    // Default task.
    this.registerTask('default', ['build']);

    this.registerTask('debugg','prepare build for debugging',[
        'concat:classes'
    ]);

    // Build a new version of the library
    this.registerTask('test', 'Test of <%= pkg.name %>', [
        'concat:js',
        'concat:jsQualyme',
        'less:build',
        'concat:cssQualyme',
        'concat:css_build',
        'jshint',
    ]);


    this.registerTask('frame7', 'Builds a development version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint',
        'copy:build',
        'jade:build',
    ]);

    this.registerTask('qualyme', 'Builds a distributable version of <%= pkg.name %>', [
        'concat:jsQualyme',
        'concat:portabilidad',
        'less:qualyme',
        'jade:build',
        'jshint',
        'copy:toAndroid',
        'copy:toEclipseWorkspace',// 'copy:build',
        // 'copy:dist',
        // 'uglify:dist'
    ]);

    // Build a new version of the library
    this.registerTask('build', 'Builds a development version of <%= pkg.name %>', [
        'concat:js',
        'concat:jsQualyme',
        'less:build',
        'concat:cssQualyme',
        'concat:css_build',
        'jshint',
        'copy:build',
        'jade:build',
    ]);

    // Release
    this.registerTask('dist', 'Builds a distributable version of <%= pkg.name %>', [
        'concat:js',
        'concat:jsQualyme',
        'less:build',
        'less:dist',
        'concat:cssQualyme',
        'concat:css_build',
        'concat:css_dist',
        'jshint',
        'copy:build',
        'jade:build',
        'copy:dist',
        'uglify:dist'
    ]);


    // Kitchen Sink
    this.registerTask('kitchen', 'Builds a kithcen sink', [
        'build',
        'jade:kitchen',
        'less:kitchen'
    ]);
    this.registerTask('examples', 'Compile examples less and jade files', [
        'jade:examples',
        'less:examples'
    ]);
    this.registerTask('apps', 'Compile apps less and jade files', [
        'jade:apps',
        'less:apps'
    ]);

    // Server
    this.registerTask('server', 'Run server', [
        'connect',
        'open',
        'watch'
    ]);

};
