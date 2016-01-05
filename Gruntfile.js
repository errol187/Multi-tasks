'use strict';

module.exports = function(grunt) {
	
	// Specify the target and alternative sass files directory
	if ( grunt.option('target') !== undefined) {
		// var affCode = grunt.option('target');
		// var affCode = grunt.option('target'); 
		var affCode = grunt.option('target');	
	} else {
		var affCode = 'htx';	
	}
	
	console.log(affCode);
	var taskProcess = grunt.option('proc'); 
//	var _ = require('underscore');

	var sass = require('node-sass');
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	require('jit-grunt')(grunt, {
		replace : 'string-replace'
	});

    grunt.initConfig({

    	pkg: grunt.file.readJSON('package.json'),

		project: {
		    app: ['public'], // Default is Conxxe
		    // assets: ['<%= project.app %>/' + affCode],
		    assets: ['<%= project.app %>/assets'], 
		    assetsPublic: ['<%= project.app %>/public'],
		    assetsCloned: ['<%= project.assets %>/'+affCode],
		    defaultAssets: ['<%= project.assets %>/htx'], // Default project for cloning
		    css: ['<%= project.assets %>/css'],
		    jsSrc: ['<%= project.assets %>/javascripts'],
		    // images: ['<%= project.assetsCloned %>/images'],
		},

		// Replace sass paths for compiling/@import
		// Use carefully and as required
		// Always set the target so as to only modify the specified file(s)
		// e.g. grunt replace:dist --target=htx
		replace: {
			dist: {
				// files: {
		  //         '<%= project.assets %>/<%= grunt.option(\"target\") %>/styles.scss'
		  //       },
				src: [
				'<%= project.assets %>/'+affCode+'/sass/styles.scss',
				'<%= project.assets %>/'+affCode+'/sass/_mixins.scss'
				// 'public/assets/sass-htx/styles.scss',
				// 'public/assets/sass-htx/mixins.scss'
				],
        		overwrite: true,
        		replacements: [{
		            // from: /(assets\/sass)/g,
		            // from: /[\/]\w.*[a-zA-Z0-9]+[\/]/g, // format: public/assets/sass/_forms
		            from: /([\/][^\s]+)(sass)/g,
		            to: '/assets/'+affCode+'/sass'
		        }]
			}
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

		        	// Compile sass files to css folder e.g css/styles.css
		        	// Affiliates folder is set at runtime e.g. --target=htx
		            // '<%= project.assets %>/css/styles.css' : '<%= project.assetsCloned %>/sass/styles.scss'
		            '<%= project.assets %>/css/styles.css' : '<%= project.assetsCloned %>/sass/styles.scss'
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
    			// Require --target=[affiliate] to be set on command line 
    			// for default and cloned folders to be watched
		        files: '<%= project.assetsCloned %>/**/*.scss',
		        // Clean: clear css files
		        // Sass: 
		        tasks: ['clean:css', 'sass:dev', 'copy:css'],

		        options: {
		          // This will make the task [slightly quicker](https://github.com/gruntjs/grunt-contrib-watch#optionsspawn) 
		          // to respond. In some cases the task could fail to run but for dev, this doesn't cause many issues.
		          // nospawn: true
		        }

		    },

		     jsSrc: {
		     	files: [ '<%= project.assetsCloned %>/**/*.js' ],
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
				files: { '<%= project.assetsPublic %>/js/combined.min.js': [
		      		'<%= project.assetsCloned %>/javascripts/combined.js',
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
		// Merge all javascript files into one file (combiined.js)
		// using whichever order of importance is specified
		// To find out more about ordering refer to grunt help files
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
		//	Delete css files ready for new compiled versions
		//	.__ files are derived from Macintosh file systems
		css: ['<%= project.assets %>/css/*.css', '<%= project.assets %>/css/*.map'],
		// Remove larger files in favour of minified versions for production
		prod: [
			'!<%= project.assetsPublic %>/js/<%= grunt.option(\"target\") %>/*.min.js',
			'<%= project.assetsPublic %>/js/<%= grunt.option(\"target\") %>/*.js',
			'!<%= project.assetsPublic %>/css/<%= grunt.option(\"target\") %>/*.min.css',
			'<%= project.assetsPublic %>/css/<%= grunt.option(\"target\") %>/*.css'
		]
		
	},

	copy: {
		all: {
			files: [
			// Newbuild - copy all files
				{
					expand: true, 
					cwd: '<%= project.defaultAssets %>/', 
					flatten: false,
					src: ['**'], 
					dest: '<%= project.assetsCloned %>/'
				} // 
			]
		},

		// Newbuild: Used in conjunction with new builds
		sass: {
			files: [
				// 1. Copy Bootstrap and sass files
	  			{ 
	  				expand: true, 
	  				cwd: '<%= project.defaultAssets %>/sass/',
	  				flatten: false,
	  				src: ['**'], 
	  				dest: '<%= project.assets %>/<%= grunt.task.current.args[0] %>/sass'
	  				
	  			} // Sass

  			]
  		},
  		images: {
			files: [
				// 1. Copy all images
	  			{ 
	  				expand: true, 
	  				cwd: '<%= project.defaultAssets %>/images/',
	  				flatten: false,
	  				src: ['**'], 
	  				dest: '<%= project.assets %>/<%= grunt.task.current.args[0] %>/images'
	  				
	  			} // Images

  			]
  		},
  		fonts: {
			files: [
				// 1. Copy fonts
	  			{ 
	  				expand: true, 
	  				cwd: '<%= project.defaultAssets %>/fonts/',
	  				flatten: false,
	  				src: ['**'], 
	  				dest: '<%= project.assets %>/<%= grunt.task.current.args[0] %>/fonts'
	  				
	  			} // Fonts

  			]
  		},
  		js: {
			files: [
				// 1. Copy javascript files
	  			{ 
	  				expand: true, 
	  				//cwd: '<%= project.jsSrc %>/',
	  				flatten: true,
	  				src: ['<%= project.defaultAssets %>/javascripts/*', '!<%= project.defaultAssets %>/javascripts/combined.js'], 
	  				dest: '<%= project.assets %>/<%= grunt.task.current.args[0] %>/javascripts'
	  				
	  			} // Js

  			]
  		},
  		// Newbuild:End

  		// Tasks used in conjucntion with 'watch'
		jsSrc: {
			files: [
			// includes files within path 
			{ 
				src: '<%= project.assets %>/javascripts/combined.js', 
				dest: '<%= project.assetsPublic %>/js/<%= grunt.option(\"target\") %>/combined.js' 
				} // JS
  			]
  		},

  		css: {
			files: [
			// Copy to public folder location
			// This includes affiliates, defined in affCode global at runtime e.g. --target=htx
			// { src: '<%= project.css %>/styles.css', dest: '<%= project.assetsPublic %>/css/styles.css' } // CSS
			{ 
				src: '<%= project.css %>/styles.css', 
				dest: '<%= project.assetsPublic %>/css/<%= grunt.option(\"target\") %>/styles.css' 
				} // CSS
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
    // e.g. grunt cssmin --target=htx
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

      	prod: {
      		files: [{
      			expand: true,
		      	cwd: '<%= project.css %>/',
		      	src: ['styles.css'],
		      	// src: '<%= project.css %>/styles.css', 
		      	dest: '<%= project.assetsPublic %>/css/<%= grunt.option(\"target\") %>/', // CSS
		      	// dest: '<%= project.css %>/css/',
		      	ext: '.min.css'
		    }]
      	}

      }
  });

    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.registerTask('default', ['sass']);
	
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-cssjoin');


	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-spritesmith');

	// Default: Run everything
	// grunt.registerTask('default', ['clean', 'sass', 'uglify', 'concat', 'copy:sSrc', 'copy:css', ]);

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

	grunt.registerTask('newBuild', 'New build for affiliates',  function() {

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
		// grunt.task.run('copy:' + grunt.task.current.args[0] + ':' + grunt.task.current.args[1]);
		// COMMAND EXAMPLE:
		// grunt newBuild watch  --target=htx/ (target will set affCode)
		// grunt.task.run('watch' );
		console.log("GRUNT:TASK = ", grunt.task.current.args[0], grunt.task.current.args[1], affCode);

	});
	
	// Production tasks
	// Minify css and js files.
	// Ensure --target is set for affiliate
	grunt.registerTask('production', ['cssmin:prod', 'uglify:js', 'clean:prod']);

};
