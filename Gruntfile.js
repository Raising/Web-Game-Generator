'use strict';
/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    let classesList = ["PYC/*.js","PYC/**/*.js","PYC/**/**/*.js"];
    let modulesList = ["module/*.js"];


    // Project configuration.
    grunt.initConfig({
                // Metadata.
        options: {
          // The separator string (can be colored).
          
        },
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
                    'dist/css/in.css' : ['src/less/ess']
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
                src: classesList,
                dest: "build/js/WGG_Classes.js"
            },
            descriptorStrife:{
                src: ["GameDescriptors/gameDescription.js","GameDescriptors/STRIFE/*.js"],
                dest: "GameDescriptors/STRIFE.js"
            },
            all:{
                src: [...modulesList,...classesList],
                dest: "build/js/WGG.js"  
            }
        
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['build/js/WGG'],
                dest: 'dist/js/WGG.min.js',
            },
        },
        jshint: {
            options: {
               
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            classes: {
                src: classesList,
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
        'jshint:classes',
        'concat:classes',
        'concat:descriptorStrife'
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
