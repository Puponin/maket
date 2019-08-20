"use strict";
const /*  */
/* Основные плагины */
    gulp = require("gulp"),//Version 4.0.0!!!!!!CLI version 2.0.1!!!!!!!!!!! 
    plumber = require("gulp-plumber"),
    watch = require("gulp-watch"),
    less = require("gulp-less"),
    // sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync"),
    reload = require("browser-sync").reload,
    /* Плагины для сжатия и конкатинации */
    htmlmin = require("gulp-htmlmin"),
    cssmin = require("gulp-csso"),
    jsmin = require('gulp-uglify-es').default,
    include = require("gulp-file-include"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    concat = require("gulp-concat"),
    svgo = require('gulp-svgo'),
    /* Оптимизация */
    prefixer = require("gulp-autoprefixer"),
    babel = require('gulp-babel'),
    media = require("gulp-group-css-media-queries"),
    rename = require("gulp-rename");

/* Выбор препроцессора */
const preproc = less;

/* Основные пути */
const path = {
    /* Пути для папок с готовыми файлами */
    build: {
        html: "./app/build/",
        js: "./app/build/js/",
        css: "./app/build/css/",
        img: "./app/build/img/",
        font: "./app/build/fonts/"
    },
    /* Пути для папок с исходными файлами */
    src: {
        html: "./app/src/*.html",
        js: ["./app/src/js/script.js"],
        style: "./app/src/style/main.+(less|scss)",
        css: "./app/src/css/",
        img: "./app/src/img/**/*.*",
        font: "./app/src/fonts/**/*.*"
    },
    /* Пути для прослушки изменений файлов */
    watchSrc: {
        html: ["./app/src/**/*.html", "./app/src/html_partials/**/*.*"],
        js: "./app/src/js/**/*.js",
        style: "./app/src/style/**/*.*",
        img: "./app/src/img/**/*.*",
        font: "./app/src/fonts/**/*.*"
    }
};
/* Конфигурация локального сервера */
const config = {
    server: {
        baseDir: "./app/build/"
    },
    tunnel: false,
    host: "localhost",
    port: 666
};
/* ВЕС ACTION */
const htmlBuild = () => {
    return gulp
        .src(path.src.html)
        .pipe(plumber())
        .pipe(include({
            prefix: "@@",
            basepath: "@file",
            context: {
              name: 'example'
            }
        }))
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
};
const styleBuild = () => {
    return gulp
        .src(path.src.style)
        .pipe(plumber())
        /* .pipe(sourcemaps.init()) */
        .pipe(preproc())
        .pipe(gulp.dest(path.src.css))
        .pipe(prefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
        }))
        .pipe(media())
        // .pipe(cssmin())
        /* .pipe(rename({
            suffix: ".min"
        })) */
        /* .pipe(sourcemaps.write(".")) */
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
};
const jsBuild = () => {
    return gulp
        .src(path.src.js)
        .pipe(babel())
        .pipe(plumber())
        /* .pipe(sourcemaps.init()) */
        .pipe(concat('script.js'))
        // .pipe(jsmin())
        /* .pipe(rename({
            suffix: ".min"
        })) */
        /* .pipe(sourcemaps.write(".")) */
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
};
const imageBuild = () => {
    return gulp
        .src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
            stream: true
        }));
};
const imageSvg = () => {
    return gulp
        .src(path.src.img)
        .pipe(svgo())
        .pipe(gulp.dest(path.build.img));
};
const fontBuild = () => {
    return gulp
        .src(path.src.font)
        .pipe(gulp.dest(path.build.font));
};
const doingWatch = () => {
    gulp.watch(path.watchSrc.html, htmlBuild);
    gulp.watch(path.watchSrc.style, styleBuild);
    gulp.watch(path.watchSrc.img, imageBuild);
    gulp.watch(path.watchSrc.js, jsBuild);
    gulp.watch(path.watchSrc.font, fontBuild);
};
const server = () => {
    return browserSync(config);
};
const build = gulp.parallel(htmlBuild, styleBuild, jsBuild, imageBuild, fontBuild);
const allActions = gulp.parallel(build, server, doingWatch);
/* ############################################################################## */
gulp.task('build', build);
gulp.task('default', allActions);
