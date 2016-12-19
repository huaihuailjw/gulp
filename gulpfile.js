// 引入 gulp
var gulp = require('gulp'),
	yargs = require('yargs').argv, //获取gulp命令后传入的参数
	template = require('gulp-template'), // 模板
	livereload = require('gulp-livereload'), //与服务器同步刷新
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
		'useref'
	]),
	Q = require('q'),
	del = require('del'),
	pathConfig = {
		dist: 'build/',
		src: 'src/',
		rev: 'rev'
	},
	manifest = {
		vendor: 'manifest.vendor.json',
		html: 'manifest.html.json',
		css: 'manifest.css.json',
		img: 'manifest.img.json',
		js: 'manifest.js.json'
	},
	compress = false,
	img = false,
	js = false,
	version = new Date().getTime(),
	api = require('./url.json'),
	mkRev = function (stream, manifest) {
		return stream
			.pipe(pkg.rev())
			.pipe(pkg.rename(function (file) {
				file.extname += '?rev=' + version + /\-(\w+)(\.|$)/.exec(file.basename)[1];
				if (/\-(\w+)\./.test(file.basename)) {
					file.basename = file.basename.replace(/\-(\w+)\./, '.');
				};
				if (/\-(\w+)$/.test(file.basename)) {
					file.basename = file.basename.replace(/\-(\w+)$/, '');
				};
			}))
			.pipe(pkg.rev.manifest(manifest, {
				merge: true
			}))
			.pipe(gulp.dest("./rev"));
	};
gulp.task('server', function () {
	yargs.p = yargs.p || 3000;
	browserSync.init({
		server: {
			baseDir: pathConfig.dist,
			index: 'index.html'
		},
		port: yargs.p,
		browser: ["chrome"]
	});
});
gulp.task('setValue', function () {
	if (yargs.pub) {
		switch (yargs.pub) {
			// 正式环境
			case "url":
				console.log('开始代码压缩');
				compress = true;
				img = true;
				js = true;
				api = require('./url.json');
				break;
				//测试环境
			case "test":
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
gulp.task('del-dist', function () {
	return del([
		pathConfig.dist,
		pathConfig.dist + 'index.html',
		pathConfig.rev
	]);
});
gulp.task('build-rev-img', ['del-dist'], function () {
	return mkRev(gulp.src([pathConfig.src + "**/images/*.*", pathConfig.src + "**/images/**/*.*"])
		.pipe(pkg.cache(pkg.if(img, pkg.imagemin({
			progressive: true,
			interlaced: true
		}))))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = file.dirname;
		})), manifest.img);
});
gulp.task('build-dist-img', function () {
	return mkRev(gulp.src([pathConfig.src + "**/images/*.*", pathConfig.src + "**/images/**/*.*"])
		.pipe(pkg.cache(pkg.if(img, pkg.imagemin({
			progressive: true,
			interlaced: true
		}))))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = file.dirname;
		})), manifest.img);
});
// 编译Sass
gulp.task('build-dist-sass', function () {
	return mkRev(gulp.src(pathConfig.src + "**/css/*.scss")
		.pipe(pkg.sass({
			outputStyle: compress ? 'compressed' : 'nested'
		}))
		.pipe(pkg.plumber({
			errorHandler: pkg.notify.onError('Error: <%= error.message %>')
		}))
		.pipe(pkg.autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
		}))
		.pipe(pkg.revReplace({
			manifest: gulp.src("./rev/manifest.img.json")
		}))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(browserSync.reload({
			stream: true
		}))
		.pipe(pkg.rename(function (file) {
			file.dirname = file.dirname;
		})), manifest.css);
});
// 编译Html
gulp.task('build-dist-html', function () {
	return mkRev(gulp.src(pathConfig.src + '**/*.html', {
			base: pathConfig.src
		})
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
		}))
		.pipe(pkg.rename(function (file) {
			file.dirname = file.dirname;
		})), manifest.html);
});
// 编译Js
gulp.task('build-dist-js', function () {
	var deferred = Q.defer();
	return mkRev(gulp.src([pathConfig.src + '**/js/*.js'])
			.pipe(template(api))
			.pipe(pkg.if(js, pkg.uglify()))
			.pipe(gulp.dest(pathConfig.dist))
			.pipe(browserSync.reload({
				stream: true
			}))
			.pipe(pkg.rename(function (file) {
				file.dirname = file.dirname;
			})), manifest.js)
		.on('finish', function () {
			mkRev(gulp.src([pathConfig.src + "**/js/vendor/*.*"])
				.pipe(gulp.dest(pathConfig.dist))
				.pipe(pkg.rename(function (file) {
					file.dirname = file.dirname;
				})), manifest.vendor)
		}).on('finish', deferred.resolve);
});
//合并
gulp.task('build-rep-rev', ['build-dist-html', 'build-dist-js'], function () {
	return gulp.src([
			pathConfig.dist + '**/*.html',
			'!' + pathConfig.dist + 'index.html',
		])
		.pipe(pkg.revReplace({
			manifest: gulp.src("./rev/*.*")
		}))
		.pipe(gulp.dest(pathConfig.dist));
});
gulp.task('default', ['setValue', 'build-dist-img', 'build-dist-sass', 'build-dist-js', 'build-dist-html']);
gulp.task('default1', ['setValue', 'build-dist-sass', 'build-rep-rev']);
gulp.task('rev', ['build-rev-img'], function () {
	gulp.start('default1');
});
gulp.task('watch', function () {
	gulp.watch(pathConfig.src + 'css/*.*', ['build-dist-sass']);
	gulp.watch(pathConfig.src + '**/*.html', ['build-dist-html']);
	gulp.watch(pathConfig.src + 'js/*.*', ['build-dist-js']);
});