# HTX-tasks

> Basic workflow

(Prior to creating a new affiliate make sure that the default files have been built and *.min files created)

******************************************************************************************
Workflow summary:

[Css]
All css files are generated from sass files. For each project a folder is created under the assets directory.
e.g. sass-{affiliate-append} Where affiliate-prefix is relative to the white label company 
e.g. sass-htx
Note: the 'default' directory will be used for building affiliates

[Javascript]
Currently affiliate javascript files have a standard approach. and will need a manual update. Apply the white-label {affiliate-prefix}.js file to the bottom of the 'html' template page. 
e.g. where affiliate-prefix is relative to the white label company
e.g. htx.js

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
npm install grunt-contrib-copy --save-dev
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

## Update sass file paths
 _Run this task with `grunt replace:dist --target=htx` command_
 - ' currently only the sass files though I am looking into updating the branding color references'

## Minify Css
_Run this task with `grunt cssmin --target=[affiliateCode]` command_

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
**Basic Structure with affiliate folder - cloned src files:**
.
├── public
│   └── public
│      └── css
│         └── [affiliateCode]
│             └── *.min.css
├──────── js
│        └── [affiliateCode]
│            └── *.min.js
└─────── fonts
    ├─── images
    ├─── sass
    └─── js

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

