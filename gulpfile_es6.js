// 引入 gulp
var gulp = require('gulp'),
	yargs = require('yargs').argv, //获取gulp命令后传入的参数
	template = require('gulp-template'), // 模板
	browserSync = require('browser-sync'), // 启动服务 文件修改实时同步到浏览器
	pkg = require('gulp-packages')(gulp, [
		'autoprefixer', //浏览器前缀
		'cache', //缓存
		'clean-css', //压缩css
		'file-include',
		'filter',
		'htmlmin',
		'if',
		'imagemin', //压缩图片
		'main-bower-files',
		'match',
		'plumber',
		'rename', //重命名
		'rev',
		'rev-replace',
		'sass',
		'uglify', //压缩js
		'notify',
		'useref',
		'sourcemaps',
		'babel',
		'concat'
	]),
	Q = require('q'),
	del = require('del'),
	pathConfig = {
		dist: 'dist/',
		src: 'es/'
	},
	compress = true,
	img = false,
	js = false,
	api = require('./url.json');
gulp.task('setValue', function () {
	if (yargs.pub) {
		switch (yargs.pub) {
			// 正式环境
			case "url":
				console.log('正式环境开始');
				compress = true;
				img = true;
				js = true;
				api = require('./url.json');
				break;
				//测试环境
			case "test":
				console.log('测试环境开始');
				api = require('./testurl.json');
				break;
		}
	};
	if (yargs.w) {
		gulp.start('watch');
	};
	if (yargs.s) {
		gulp.start('server');
	};
});
gulp.task('server', function () {
	yargs.p = yargs.p || 3000;
	browserSync.init({
		server: {
			baseDir: pathConfig.dist,
			index: 'index.html'
		},
		port: yargs.p,
		// startPath: pathConfig.server.startPath,
		browser: ["chrome"]
	});
});
gulp.task('build-img', function () {
	gulp.src(pathConfig.src + "**/images/*.*")
		.pipe(pkg.cache(pkg.if(img, pkg.imagemin({
			progressive: true,
			interlaced: true
		}))))
		.pipe(gulp.dest(pathConfig.dist))
});
// 编译Sass
gulp.task('build-sass', function () {
	gulp.src(pathConfig.src + "**/css/*.scss")
		.pipe(pkg.sass({
			outputStyle: compress ? 'compressed' : 'nested'
		}))
		.pipe(pkg.plumber({
			errorHandler: pkg.notify.onError('Error: <%= error.message %>')
		}))
		.pipe(pkg.autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
		}))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});
// 编译Html
gulp.task('build-html', function () {
	gulp.src(pathConfig.src + '**/*.html')
		.pipe(pkg.plumber())
		.pipe(pkg.fileInclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(pkg.htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});
// 编译Js
gulp.task('build-js', function () {
	gulp.src(pathConfig.src + '**/js/*.js')
		.pipe(template(api))
		.pipe(pkg.sourcemaps.init())
        .pipe(pkg.babel({
            presets: ['es2015']
        }))
		.pipe(pkg.sourcemaps.write('.'))
		.pipe(pkg.if(js, pkg.uglify()))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('default', ['setValue', 'build-sass', 'build-html', 'build-img', 'build-js']);
gulp.task('watch', function () {
	gulp.watch(pathConfig.src + 'css/*.*', ['build-sass']);
	gulp.watch(pathConfig.src + 'js/*.*', ['build-js']);
	gulp.watch(pathConfig.src + 'images/*.*', ['build-img']);
	gulp.watch(pathConfig.src + '**/*.html', ['build-html']);
})