# HTX-tasks

> Basic workflow

(Prior to creating a new affiliate make sure that the default files have been built and *.min files created)

******************************************************************************************
Workflow summary:


## Basic cloning of default assets to copy all files by running task 1. Once files are copied you can watch the affiliates folder for changes by running task 2.
1. _Run this task with the `grunt copy:all` command._
2. _Run this task with the `grunt watch --target=[affiliateCode]` command._

Grunt 'watch' will run:
Css tasks - `clean:css` `sass:dev` `copy:css` 
Js tasks - `clean:js` `concat` `copy:jsSrc`


## Production
To be run when minificatiion and clean up of files is required for a release.

_Run `grunt production --target=[affiliateCode]` command._

Tasks run `cssmin:prod` `uglify:js` `clean:prod`


Minify 
Note:   
*** Below is incomplete summary
All css files are generated from sass files. For each project a folder is created under the assets directory.
e.g. sass-{affiliate-append} Where affiliate-prefix is relative to the white label company 
e.g. sass-htx
Note: the 'default' directory will be used for building affiliates

[Javascript]
Currently affiliate javascript files have a standard approach. and will need a manual update. Apply the white-label {affiliate-prefix}.js file to the bottom of the 'html' template page. 
e.g. where affiliate-prefix is relative to the white label company
e.g. htx.js

*** Below is incomplete summary

******************************************************************************************

TODO:
1. Update task to dynamically add the required javascript prefix e.g htx.js
2. Update readme.md file and apply additonal explanations inside grunt file
3. Update information in regards to command line variables
4. Combine tasks for a single command line workflow process e.g grunt build:new:affiliate
5. Development to apply brand colors by replacment inside 'variables.scss' file specific to the affiliate project
6. 


## Getting Started
This plugin uses:   
grunt `>=0.4.0`   
grunt-cli `>=0.1.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install
```

A list of grunt tasks are provided below:

## Copy all
_Run this task with the `grunt copy:all` command._

Task targets, all files and copies them to specified folder. 
_Run this task with the `grunt copy:all --target=[affiliateCode]` command._

## Copy Sass
_Run this task with `grunt copy:sass:[affiliateCode]` command_

## Copy Javascript
_Run this task with `grunt copy:js:[affiliateCode]` command_

## Copy Images
_Run this task with `grunt copy:images:[affiliateCode]` command_

## Copy Fonts
_Run this task with `grunt copy:fonts:[affiliateCode]` command_

## Update sass file paths
 _Run this task with `grunt replace:dist --target=htx` command_
 - ' currently only the sass files though I am looking into updating the branding color references'

## Minify Css
_Run this task with `grunt cssmin:prod --target=[affiliateCode]` command_

## Minify JS
_Run this task with `grunt uglify:js --target=[affiliateCode]` command_



#### --target
Type: `[list affilates, 1, 2, 3, 4]`  
Default: `htx`

Note: If command line global is not set the default folder will be set to 'htx'

### Usage Examples

```js

```

```shell
**Basic Structure with affiliate folder - cloned src files:**
.
└── public
    └── assets
        ├── css
        ├── javascripts
        └── [affiliateCode]
            ├── fonts
            ├── images
            ├── sass
            └── javascripts

```

```shell
**Basic Structure with affiliate folder - public folder generated files:**
.
└── public
    └── public
        ├── css
        │   └── [affiliateCode]
        │      └── *.min.css
        ├───fonts
        │    └── [affiliateCode]
        │        └── *.*
        ├── imges
        │   └── [affiliateCode]
        │        └── *.*
        └── js
            └── [affiliateCode]
                └── *.min.js                        


```

```shell

```


```shell
.
├── 
├── 
│   ├────
│   ├────
└── 
    ├── 
    └── 
        └── 

```
NOTE: Blah! Blah! Blah! Blah! Blah! Blah! Blah! Blah!
TODO:   
1. Production tasks   
2. Combine workflow tasks   
3. Branding color command line variables to be set and update '_variables.scss'   


##### Troubleshooting

By default, .......... , .......... `highlihgted references`. Use this section to fill out desctiption for general errors etc.

```js

```



```shell

```



## Release History

 * 2015-00-00   v0.0.0   .

---

Task submitted by [Stephen Anderson]()

