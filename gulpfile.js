var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	rigger = require('gulp-rigger'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	reload = browserSync.reload,
	svgSprite = require('gulp-svg-sprite'),
	pug = require('gulp-pug');



var path = {
	build: {
		html: 'build/',
		js: 'build/assets/js/',
		css: 'build/assets/css/',
		cssLibs: 'build/assets/css/libs/',
		images: 'build/assets/images/',
		svg: 'build/assets/images/svg/'
	},
	src: {
		html: 'src/views/*.pug',
		js: 'src/js/main.js',
		style: 'src/style/main.scss',
		styleLibs: 'src/style/libs/*.*',
		images: 'src/images/**/*.*',
		svg: 'src/svg/**/*.svg'
	},
	watch: {
		html: 'src/**/*.pug',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		images: 'src/images/**/*.*',
		svg: 'src/svg/**/*.svg'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build",
		directory: true
	},
	//tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "PipZip"
};

gulp.task('html:build', function buildHTML() {
	return gulp.src('src/views/*.pug')
		.pipe(pug({
		// Your options in here.
		pretty: true
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
  });

gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(plumber())
		.pipe(rigger())
		//.pipe(sourcemaps.init())
		//.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
	return gulp.src(path.src.style)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		//.pipe(cleanCSS({rebase: false}))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('style-libs:build', function () {
	return gulp.src(path.src.styleLibs)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(cleanCSS({rebase: false}))
		.pipe(gulp.dest(path.build.cssLibs))
		.pipe(reload({stream: true}));
});

gulp.task('images:build', function () {
	return gulp.src(path.src.images)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.images))
		.pipe(reload({stream: true}));
});

gulp.task('svgSprite:build', function () {
	return gulp.src(path.src.svg)
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'
				}
			},
		}))
		.pipe(gulp.dest(path.build.svg));
});



gulp.task('build', gulp.parallel('html:build', 'js:build', 'style:build', 'style-libs:build', 'images:build', 'svgSprite:build'));

gulp.task('watch', function(){
	gulp.watch([path.watch.html], gulp.series("html:build"));
	gulp.watch([path.watch.style], gulp.series("style:build"));
	gulp.watch([path.watch.js], gulp.series("js:build"));
	gulp.watch([path.watch.images], gulp.series("images:build"));
	gulp.watch([path.watch.svg], gulp.series("svgSprite:build"));
});

gulp.task('webserver', function () {
	browserSync.init(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('webwatch', gulp.parallel('watch', 'webserver'));

gulp.task('default', gulp.series('build','webwatch'));
