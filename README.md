# Multi-tasks

Grunt process (to be added to sccript)

1. grunt copy:sass:['affilliate'] e.g. grunt copy:sass:htx
2. BRANDING: update sass file paths e.g grunt replace:dist --target=htx
3. watch folders and build based on specifics [affiliate, target] e.g. grunt watch --target=htx
4. minify for production e.g. grunt cssmin --target=htx
5. minify js for production e.g. grunt uglify:js 

(Prior to creating a new affiliate make sure that the default files have been built and *.map files created)

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
Update task to dynamically add the required javascript prefix e.g htx.js
Update readme.md file and apply additonal explanations inside grunt file
Update information in regards to command line variables
Combine tasks for a single command line workflow process e.g grunt build:new:affiliate
Development to apply brand colors by replacment inside 'variables.scss' file specific to the affiliate project
