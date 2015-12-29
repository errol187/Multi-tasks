'use strict';

module.exports = function(grunt) {

	// var affCode = grunt.option('target');
	var affCode = grunt.option('target'); 
	var taskProcess = grunt.option('proc'); 
	var _ = require('underscore');

	var sass = require('node-sass');
	require('time-grunt')(grunt);
	//require('load-grunt-tasks')(grunt);
	require('jit-grunt')(grunt);

    grunt.initConfig({

    	pkg: grunt.file.readJSON('package.json'),

		project: {
		    app: ['public'], // Default is Conxxe
		    assets: ['<%= project.app %>/' + affCode],
		    // assets: ['<%= project.app %>/assets'],
		    assetsPublic: ['<%= project.app %>/public'],
		    sass: ['<%= project.assets %>/sass'],
		    css: ['<%= project.assets %>/css'],
		    jsSrc: ['<%= project.assets %>/javascripts'],
		    images: ['<%= project.assets %>/images'],
		},

		sass: {
		    dev: {
		        options: {
		            style: 'expanded',
		            compass: false,
		            loadPath: '.', // root
		            sourcemap: 'none',
		            noCache: true
		        },
		        files: {

		        	// Compile sass files to css
		            '<%= project.assets %>/css/styles.css' : '<%= project.sass %>/styles.scss'
		        }
		    }
		},

		 // sass: {
	  //     dev: {
	  //       // Takes every file that ends with .scss from the scss 
	  //       // directory and compile them into the css directory. 
	  //       // Also changes the extension from .scss into .css. 
	  //       // Note: file name that begins with _ are ignored automatically
	  //       files: [{
	  //         expand: true,
	  //         cwd: '<%= project.sass %>/',
	  //         src: ['**/*.scss'],
	  //         dest: '<%= project.assets %>/css/styles.css',
	  //         ext: '.css'
	  //       }]
	  //     },
	  //     options: {
	  //       sourceMap: false, 
	  //       //outputStyle: 'nested', 
	  //       //imagePath: "../",
	  //     }
	  //   },	

	    //  sass: {
	    //   global: {
	    //     options: {
	    //       sourceMap: true,
	    //       sourceComments: false,
	    //       outputStyle: 'expanded'
	    //     },
	    //     files: [{
	    //       expand: true,
	    //       cwd: '<%= paths.sass %>/',
	    //       src: ['**/*.scss'],
	    //       dest: '<%= paths.devCSS %>/',
	    //       ext: '.css'
	    //     },
	    //     ],
	    //   }
	    // }, // sass
		
		watch: {
    		sass: {
		        files: '<%= project.sass %>/**/*.scss',
		        tasks: ['clean:css', 'sass:dev', 'copy:css'],

		        options: {
		          // This will make the task [slightly quicker](https://github.com/gruntjs/grunt-contrib-watch#optionsspawn) 
		          // to respond. In some cases the task could fail to run but for dev, this doesn't cause many issues.
		          // nospawn: true
		        }

		    },

		     jsSrc: {
		     	files: [ '<%= project.jsSrc %>/**/*.js' ],
		     	tasks: ['clean:js', 'concat', 'copy:jsSrc']
		     },

		     sprite: {
		        files:    [ '<%= project.images %>/sprites/*.png' ],
		        tasks:    [ 'sprite:all', 'copy:css', 'copy:spriteImages']
		    },
		 //    livereload: {
			// 	files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
			// 	options: {
			// 		livereload: true
			// 	}
			// }
		},

		uglify: {
			js: {
				files: { '<%= project.assets %>/javascripts/combined.js': [
		      		
		      		'<%= project.assets %>/javascripts/*.js',
		      		'!<%= project.assets %>/javascripts/*.js.map',
		      		'!<%= project.assets %>/javascripts/*.min.js'
		    	]
		    }
		}
	},

	// Image spriting - the following are pretty standard and minimal options
    // for spritesmith. The main thing here is setting the css format to be LESS.
    sprite: {
      retina: {
        'imgPath'   :  '../img/spritesheet@2x.png',
        'src'       :  '<%= meta.inputPath %>/sprites@2x/*.png',
        'dest'      :  '<%= meta.outPath %>/img/spritesheet@2x.png',
        'destCss'   :  '<%= meta.inputPath %>/less/global/spritesmith@2x.less',
        'cssformat' :  'less'
      },
      all: {
        // 'imgPath'   :  '../img/spritesheet.png',
        'src'       :  '<%= project.images %>/sprites/*.png',
        'dest'      :  '<%= project.images %>/spritesheet.png',
        'destCss'   :  '<%= project.sass %>/_spritesmith.scss'
        //'cssformat' :  'less'
      }
    },

	concat: {
		// using whichever order of importance you need
	  	'<%= project.assets %>/javascripts/combined.js': [
	  		'!<%= project.assets %>/javascripts/combined.js',
	  		'<%= project.app %>/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
	  		'<%= project.app %>/bower_components/moment/min/moment.min.js',
	  		'<%= project.app %>/bower_components/moment/min/locales.min.js',
	  		'<%= project.app %>/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
	  		'<%= project.assets %>/javascripts/vendor_*.js',
	  		'<%= project.assets %>/javascripts/**/*.js'
	  		], // Javascript

	  	'<%= project.css %>/styles.css': [
	  		'<%= project.css %>/*.css'
	  		] // CSS
	},

	clean: {
		js: [
			'<%= project.assets %>/javascripts/combined.js',
			'<%= project.assets %>/javascripts/._*.js',
		],
		css: ['<%= project.assets %>/css/*.css', '<%= project.assets %>/css/*.map', '<%= project.sass %>/**/.__*.*']
	},

	copy: {

		all: {

			files: [
			// This is a new build for affiliates - copy all/required files
			// Copy Bootstrap and sass files
  			{ 
  				expand: true, 
  				cwd: '<%= project.sass %>/',
  				flatten: false,
  				src: ['**'], 
  				dest: '<%= project.app %>/<%= grunt.option(\"target\") %>/sass/'
  				// Sass
  			},
  			{ 
  				expand: true, 
  				cwd: '<%= project.assets %>/images/',
  				flatten: false,
  				src: ['**/*'], 
  				dest: '<%= project.app %>/<%= grunt.option(\"target\") %>/images/'
  				// Images
  			},
  			{ 
  				expand: true, 
  				cwd: '<%= project.jsSrc %>/',
  				flatten: true,
  				src: ['**/*'], 
  				dest: '<%= project.app %>/<%= grunt.option(\"target\") %>/javascripts/'
  			}, // Javascript
  			{ 
  				expand: true, 
  				cwd: '<%= project.assets %>/fonts/',
  				flatten: true,
  				src: ['**'], 
  				dest: '<%= project.app %>/<%= grunt.option(\"target\") %>/fonts/'
  			} // Fonts

  			]

		},

		jsSrc: {
			files: [
			// includes files within path 
  			{ src: '<%= project.assets %>/javascripts/combined.js', dest: '<%= project.assetsPublic %>/js/htx.js' } // JS
  			// { src: '<%= project.assets %>/javascripts/combined.js', dest: '<%= project.assetsPublic %>/' + affCode + '/js/htx.js' } // JS
  			]
  		},

  		css: {
			files: [
			// includes files within path 
			{ src: '<%= project.css %>/styles.css', dest: '<%= project.assetsPublic %>/css/styles.css' } // CSS
			// { src: '<%= project.css %>/styles.css', dest: '<%= project.assetsPublic %>/css/' + affCode + '/styles.css' } // CSS
  			]
  		},

  		spriteImages: {
			files: [
			// includes files within path 
			// { src: '<%= project.images %>/spritesheet.png', dest: '<%= project.assetsPublic %>/' + affCode + 'images/spritesheet.png' } // Sprite Images
  			]
  		}
  		
  	},

	// Minification optons for generated CSS. The compatability option here means we
    // can make use of `rem` units. This is essentially a grunt front end to the
    // [clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-set-compatibility-mode) 
    // utility.
    cssmin: {
    	options: {
	        compatibility: 'ie8',
	        keepSpecialComments: '1',
	        keepBreaks: 'true',
	        aggressiveMerging: 'false',
	        advanced: 'false',
	        restructuring: 'false',
	        roundingPrecision: -1
      	},

      	//
      	target: {
      		files: {
      			'!<%= project.css %>/research.css': ['!<%= project.css %>/research.css']
      		}
      	}
      }
  });

    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);
	
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-cssjoin');


	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-spritesmith');

	// Run everything
	grunt.registerTask('default', ['clean', 'sass', 'uglify', 'concat', 'copy:sSrc', 'copy:css', ]);

	// Create a new build
	// Copy bootstrap and compile with current template to another folder
	
	// Command line seet affiliate code e.g. cxe

	// Affiliate task/function  for new builds or updates
	// TODO: apply additional parameters for relevant affiliates by code
	// [updates, watching, etc.]

	// Steps [create new build, watch, publish]
	// grunt newBuild --verbose --proc=all  --target=htx
	// 
	// 

	grunt.registerTask('newBuild', 'New build for affiliates',  function(arg) {

		/*
		* [Arg: 'All', 'Sass', 'Js']
		*
		*	affCode = grunt.option('target'); 
		*	taskProcess = grunt.option('proc'); 
		*	
		*	Affiliate Default = 'cxe'
		*
		*/

		// Set directory if not set
		// Default will be 'assets'
		// if (!affcode){
		// 	// default: assets
		// 	//	grunt.config('project.assets' , 'assets');	
		// }

		// grunt.log.write(taskProcess);
		// grunt.log.write(grunt.option('target'));
		// grunt.log.write(grunt.config.get('copy.css.files'));
		
		//grunt.log.write( grunt.config.get('copy.css.files') );
		//grunt.log.write( _.each( grunt.config.get('copy.css.files') ) );
		// var objCopy = grunt.config.get('copy.css.files')[0];
		// for (var key in  objCopy) {
 	// 		 grunt.log.write([key]);
		// }

		// Run tasks
		// grunt.task.run('copy:' + taskProcess);
		// COMMAND EXAMPLE:
		// grunt newBuild watch  --target=htx/ (target will set affCode)
		grunt.task.run('watch' );

	});

};