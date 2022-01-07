# Theme Template

Theme template using panini to divide and sub-divide each html document to a more clean coding.
This is define on gulp.js.

Theme template is use in Drupal project theming folder.

Added to NPM [npm](https://www.npmjs.com/package/theme_2_v1)

## Requirements:

- node
- npm install gulp-cli -g
- npm init
### Task to copy on folder (Until Better Solution)
  - npm init
  - npm install gulp-cli -g
  - npm install --save-dev fs-extra
  - npm install --save-dev theme_2_v1
  - node node_modules/theme_2_v1/init-package.js
  - Design Folder execute:
      content for the work enviroment will be copied
  ```
  $ node node_modules/theme_2_v1/init-package.js
  ```
  - Test by Runnig gulp to activate browsersync on http://localhost:3000/
  - Build Asset Using drupal command to publish on theme folder 

    ## theme folder
    ```
    . drupal main folder /themes
    ├── contrib
    ├── custom                  # custom folder
    │   ├── xxx                 # Project folder
    │       ├── css             # Project folder
    │       ├── js              # Project folder
    │       ├── images          # Project folder
    │       └── design          # Design folder of this project
    |       └── templates       # Project folder
    |       └── config          # Project folder 
    └──
   ```
    
    ***Design folder will host all the document

### Cont :
  - npm install --save-dev gulp gulp-postcss gulp-sass gulp-sourcemaps gulp-uglify gulp-environments autoprefixer cssnano browser-sync jquery popper.js bootstrap tether panini rimraf gulp-html

  ```
  $npm install gulp-cli -g
  $npm init
  $npm install --save-dev gulp gulp-postcss gulp-sass gulp-sourcemaps gulp-uglify gulp-environments autoprefixer cssnano browser-sync jquery popper.js bootstrap tether panini rimraf gulp-html
  ```
### Install all Dependencies with Fontawesome
  ```
  $npm install --save-dev gulp gulp-postcss gulp-sass gulp-sourcemaps gulp-uglify gulp-environments autoprefixer cssnano browser-sync jquery popper.js bootstrap tether panini rimraf gulp-html @fortawesome/fontawesome-free 

  ```

## Adding Vue.js and Bulma CSS

##### bulma additional installation
```
  $npm install --save-dev bulma
```
##### Bulma task

- watch-bulma-min (deploy all bulma css)
- watch-bulma (to use bulma in includes under scss)

##### Fontawesome additional installation
- install fontawesome on npm
```
  $npm install --save-dev @fortawesome/fontawesome-free
```
##### Task:
- Add the JS of fontawesome
```
  $gulp addon-fontawesome
```
- Add the webfont to the build document so that font-awesome can be added on SCSS as class
```
  $gulp addon-fontawesome-font
```
- Add both JS and webfont
```
$gulp addon-fontawesome-all
```
##### Add Prism 
Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind. It’s used in thousands of websites, including some of those you visit daily. 
- Download CSS and JS ["Prism"](https://prismjs.com/index.html)
- JS Add to folder src/js
- CSS Add to folder src/css
- Add Reference JS and CSS to HTML code
- Run gulp task 

```
  $gulp addon-prism
```

- update prism by overriding the code on src/js and src/css

## Gulp Tasks

- default
- clean : clean the /build/* directory
- compile-js
- compile-jquery
- compile-popper
- compile-tether
- compile-bootstrapjs
- bootstrap-optionaljs (run add jquery, popper, bootstrapjs)
- compile-bootstrap
- compile-bulma
- compile-scss
- compile-html
- compile-img
- compile-nobs
- watch
- watch-bulma-min
- watch-bulma
- addon-fontawesome
- addon-fontawesome-font
- addon-fontawesome-all
- addon-prism

# Task on Drupal Theme 
- drupal-compile-scss
- drupal-compile-bootstrap
- drupal-compile-prismcss
- drupal-compile-bulma
- drupal-js-compile
- drupal-compile-js
- drupal-compile-prismjs
- drupal-compile-fontawesomejs
- drupal-fontawesome-webfont
- drupal-compile-img

### Combination Task
- drupal-prism-compile
- drupal-fontawesome-compile
- drupal-build

## Default task
  compile bootstrap , optional js of bootstrap , watch , scss , js

## Using gulp-enviroments

- gulp task --env development : do not minify js , css and other
    ```
    $gulp 'task' --env development
    ```
- gulp task --env production :  minify js , css and other

    ```
    $gulp 'task' --env production
    ```
## Deployment

The compiled version of the codes is available under ./build

##### gulp default task
The data will be compiled on build folder

```
$gulp 'task' --env development
```

##### Clean the build folder

```
$gulp clean
```

## Version

Version 1.0.3b

## Change log

Update 5.21.20
- documentation update
- Re-arrange document folder to project_src **fix issue

Update 5.20.20
- Added init-package.js to copy from node_modules  > theme_2_V1 to Main Directory
- Added to NPM [Link](https://www.npmjs.com/package/theme_2_v1)
- Update new task in Theming folder of Drupal

Update Older
- Update 3.6.20 Added Prism
- Update 3.3.20
- Update added fontawesome Copy font to include fontawesome on SCSS
Update 10.22
- Update added fontawesome URL and JS task 

Update 9.27 
- Update src/style.scss to have an option to add bulma, bootstrap and google font
- Added gulp task compile-bulma
- seperate task for Jquery, popper , tether and bootstrap JS
- Added gulp task bootstrap-optionaljs
- Added gulp task compile-jquery
- Added gulp task compile-popper
- Added gulp task compile-tether
- Added gulp task compile-bootstrapjs
- Remove js-compile task
- Added gulp task watch-bulma-min
- Added gulp task watch-bulma

Add the following to import individual component of each framework
```
@import "google/google_font";
@import "bootstrap/bootstrap";
@import "bulma/bulma";
@import "fontawesome/fontawesome";
```

Add the following link on default page or selected page

Font Awesome 
```
<script src="js/inc/all.min.js"></script>
```

## Gulp Tasks Update
- compile-nobs : Compile without Compiling Bootstrap
- compile-bulma
  - *note that bulma and bootstrap do not work if imported in scss at the same time

- compile-img : no image minify yet

## Upcoming

- Minify Image
- Create Dist
- Guide Templateting
- Adding Dist folder

## Link to Coding Standards

- https://en.bem.info/methodology/
- https://google.github.io/styleguide/htmlcssguide.html#HTML_Formatting_Rules
- https://github.com/xfiveco/html-coding-standards/blob/master/README.md
- https://cssguidelin.es/#the-importance-of-a-styleguide
- https://github.com/necolas/idiomatic-css#general-principles

## Resources
- [gulp](https://riptutorial.com/gulp/topic/1341/getting-started-with-gulp)
- [jQuery](https://jquery.com)
- [Bootstrap](https://getbootstrap.com/)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [gulp](https://gulpjs.com/)
- [panini](https://foundation.zurb.com/sites/docs/panini.html)
  - [Playlist](https://www.youtube.com/playlist?list=PLJVWPVPk_D_3A4OBvLtsrcjL7gs1QEWLW)
- [Bulma](https://bulma.io/)
- [Prism](https://prismjs.com/index.html)
## Other

- Readme.md Guide Template [Readme.md](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- Readme.md Format [https://guides.github.com/features/mastering-markdown/](https://guides.github.com/features/mastering-markdown/)
