const {src, dest, watch, parallel, series} = require('gulp');

const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const del          = require('del');
const imagemin     = require('gulp-imagemin');

function styles() {
    return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserslist: ['last 8 version']}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });    
}

function css(){
    return src('node_modules/slick-carousel/slick/slick.css')
    .pipe(concat('_libs.scss'))
    .pipe(dest('app/scss'))
    .pipe(browserSync.stream());
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'app/js/main.js'
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function images() {
    return src('app/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}

function cleandist() {
    return del('dist')
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/fonts/**/*',
        'app/*.html'
    ], {base:'app'})
    .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'],styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'],scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles      = styles;
exports.images      = images;
exports.browsersync = browsersync;
exports.watching    = watching;
exports.scripts     = scripts;
exports.cleandist   = cleandist;
exports.images      = images;
exports.css         = css;
exports.build       = series(cleandist, images, build)
exports.default     = parallel(browsersync, styles, scripts, watching, css)


