# theme_3_V1 Template

#### Main has been moved to Version Development Version for 2.0.0

#### Version 1.2.6-a

- Simple and easy to use theme template creator for small scale project
- Temporary documentation [Link](https://live-rontea.pantheonsite.io/node/82)

#### NPM
- npm i theme_3_v1 
  -[npm](https://www.npmjs.com/package/theme_3_v1)

#### installation 
- npm init
  - node node_modules/theme_3_v1/init-package.js
  - npm i theme_3_v1
  - npm install
  - select option [1]New Project [2] [3] [4]

#### Check update
  - $npm outdated 
  - $npm update or $npm  <packagename>@latest


### Getting Started

  - $gulp
  - $gulp compile-html
  - $gulp compile-scss
  - $gulp compile-js
  - $gulp compile-img
  - $gulp watch-default

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

### Commands Available

#### $gulp 'cmd'
```
  $gulp compile-js
```

#### cmd
- hello
- clean
#### JS
```
  - compile-js
  - compile-jquery
  - compile-popper
  - compile-tether
  - compile-bootstrapjs
  - compile-prismjs
```
#### Fontawesome
```
  - addon-fontawesome
  - addon-fontawesome-font
```
#### CSS
```
  - compile-bootstrap
  - compile-bootstrapIcon
  - compile-prismcss
  - compile-bulma
  - compile-scss 
```
- Under SCSS > Styles uncomment the css framework that you want to use or include it

#### HTML
  - compile-html 

#### watch real time update
  - watch-default

#### Add Prefix CSS
  - compile-prefixscss [last 5 version default]
  - gulp compile-compscss --num-version=2 [set to last 2 version]

#### Compress CSS
  - compile-compscss

### Pipe to Production
  - 

### Uglify/Compress JS
  - 
  
- see more function on gulp.js

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
