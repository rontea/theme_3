# theme_3

A command-line interface (CLI) tool to manage and build web projects efficiently.

#### Version 2.0.0-dev.1 What's New

- ** Under Development  Documentation **
- CLI th3 
- Gulpfile.js optional
- extend list of keys in config.js
- manipulate config.js 
- expand gulpfile for extend commands

#### NPM
- npm i theme_3_v1 
  -[npm](https://www.npmjs.com/package/theme_3_v1)

#### Installation - "Not yet publish on NPM!"

```node
npm i theme_3 - test
```

```node
npm link
```

#### Updated Commands

- Move to CLI and set gulpfiles optional for commands

```node
th3 <cmd> [args]
```

Command	 - Description
- ```th3 version```	 - Check current version
- ```th3 new-project```	  - Create new Project folder [html, src]
- ```th3 set-config```	  - Create config for edit [config/config.js]
- ```th3 gulplink```	    - Link or Unlink Gulpfile
  
- ```th3 clean-build```	  - Clean build folder
- ```th3 clean	Clean```  - build folder
- ```th3 project-help```	- Check available Keys
- ```th3 css-compile```	   - Compile list of CSS and SCSS
##### CSS 
```
  th3 css-compile --list
```
##### css-compile key             - description
 - ```css  ```             - compile CSS on [src/css]
 - ```scss   ```           - compile SCSS [src/scss]
 - ```bootstrap```         - compile boostrap to CSS
 - ```bootstrapIcon```     - compile boostrap icon CSS
 - ```fontawesome ```      - compile fontawesome icon CSS
 - ```bulma ```             - compile bulma to CSS
 - ```prism ```             - compile prism css

##### key -  description
- ``` dest     ```       - Alter Destination
- ``` compress  ```       - Compress CSS
- ``` autoprefixer  ```   - Add autoprefixer value (1-5)
- ``` list    ```        - List available keys

Command	 - Description

- ```th3 css-build```	    Build CSS
- ```th3 scss-build```	  Build SCSS
- ```th3 css-watch```	    Watch CSS
- ```th3 js-compile```	  Compile list of JS

```
  th3 js-compile --list
```
##### js-compile key - description

Command	 - Description
- ```th3 js-build```	    Build JS
- ```th3 js-watch```	    Watch JS
- ```th3 html-build```	  Build HTML
- ```th3 html-watch```	  Watch HTML
- ```th3 img-build```	    Build images
- ```th3 img-watch```	    Watch images

```
  th3 icon-compile --list
```
##### icon-compile key  - description

Command	 - Description

- ```th3 icons-compile```	Compile icons
- ```th3 build-init```	  Build HTML, SCSS, CSS, JS, and Images
- ```th3 watch```	        Watch HTML, Images, CSS, and JS
- ```th3 icons-fontawesome```	  Compile icons fontawesome
- ```th3 icons-bootstrap```	    Compile icons bootstrap
- ```th3 move-res	Compile```    icons


##### Samples
```
```

### Getting Started

  - th3
  

## Build Folder
  - This folder will be created once compile has been made

   ```
    . /build
    ├── css                     # CSS includes
    ├── img                     # images
    │── js                      # JS
    │
      Pages       
   ```
- Src : Edit CSS/SASS , JS , Images
- html : organize your html codes using ["panini"](https://www.npmjs.com/package/panini)
  - layout (html): default html initial
  - pages (body): resides the index.html and other pages
  - partials : blocks of your page
    - Panini Syntax ["Link"](https://get.foundation/sites/docs/panini.html)

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
