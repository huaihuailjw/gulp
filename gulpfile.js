// 引入 gulp
var gulp = require('gulp'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
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
		dist: 'dist/',
		src: 'activity/'
	},
	manifest = {
		html: 'manifest.html.json',
		css: 'manifest.css.json',
		img: 'manifest.img.json',
		js: 'manifest.js.json'
	},
	//根据文件hash来加后缀
	mkRev = function (stream, manifest) {
		return stream
			.pipe(pkg.rev())
			.pipe(pkg.rename(function (file) {
				file.extname += '?rev=' + /\-(\w+)(\.|$)/.exec(file.basename)[1];
				if (/\-(\w+)\./.test(file.basename)) {
					file.basename = file.basename.replace(/\-(\w+)\./, '.');
				}
				if (/\-(\w+)$/.test(file.basename)) {
					file.basename = file.basename.replace(/\-(\w+)$/, '');
				}
			}))
			.pipe(pkg.rev.manifest(manifest, {
				merge: true
			}))
			.pipe(gulp.dest('.'));
	};
// 编译Img
gulp.task('build-img', function () {
	return mkRev(gulp.src(pathConfig.src + '**/img/**/*.*', {
		base: pathConfig.src
	})
		.pipe(pkg.cache(pkg.imagemin({
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = 'dist/' + file.dirname;
		})), manifest.img);
});
// 编译Sass
gulp.task('build-sass', function () {
	return mkRev(gulp.src(pathConfig.src + "**/*.scss", {
		base: pathConfig.src
	})
		.pipe(pkg.sass())
		.pipe(pkg.cleanCss())
		.pipe(pkg.plumber({
            errorHandler: pkg.notify.onError('Error: <%= error.message %>')
        }))
		.pipe(pkg.autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
		}))
		.pipe(pkg.revReplace({
			manifest: gulp.src(manifest.css)
		}))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = 'dist/' + file.dirname;
		})), manifest.css);
});
// 编译Css
gulp.task('build-css', ['build-sass', 'build-img'], function () {
	return mkRev(gulp.src(pathConfig.src + "**/*.css", {
		base: pathConfig.src
	})
		.pipe(pkg.cleanCss())
		.pipe(pkg.plumber({
            errorHandler: pkg.notify.onError('Error: <%= error.message %>')
        }))
		.pipe(pkg.revReplace({
			manifest: gulp.src(manifest.css)
		}))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = 'dist/' + file.dirname;
		})), manifest.css);
});
// 编译Html
gulp.task('build-html', function () {
	var deferred = Q.defer();
	mkRev(gulp.src(pathConfig.src + '**/*.html', {
		base: pathConfig.src
	})
		.pipe(pkg.plumber())
		.pipe(pkg.htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = 'dist/' + file.dirname;
		})), manifest.html)
		.on('finish', function () {
			mkRev(gulp.src(pathConfig.dist + '**/*.html', {
				base: pathConfig.src
			})
				.pipe(pkg.revReplace({
					manifest: gulp.src(manifest.html)
				}))
				.pipe(gulp.dest(pathConfig.src)), manifest.html)
				.on('finish', deferred.resolve);
		});
	return deferred.promise;
});
// 编译Js
gulp.task('build-js', function () {
	return mkRev(gulp.src(pathConfig.src + '**/*.js', {
		base: pathConfig.src
	})
		.pipe(pkg.uglify())
		.pipe(gulp.dest(pathConfig.dist))
		.pipe(pkg.rename(function (file) {
			file.dirname = 'dist/' + file.dirname;
		})), manifest.js);
});

gulp.task('default', ['build-css', 'build-html', 'build-js',  'watch']);
gulp.task('all', function () {
	gulp.start('default');
});
/*
 * 监控文件
 */
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(['activity/**/*.*', pathConfig.src + '**/**/*.*'],[ 'all']);
	gulp.watch([pathConfig.src + '**/*.*', pathConfig.src + '**/**/*.*'],[ 'default']);
});
