<h2>前端自动化gulp环境搭建</h2>

<p>为了UED前端团队更好的协作开发同时提高项目编码质量，我们需要将Web前端使用工程化方式构建；</p>

<p>目前需要一些简单的功能：</p>

<pre><code>    
	1. 版本控制
    5. 编译SASS
    2. 检查文件
    3. 压缩图片
    4. 压缩CSS
    6. 压缩JS
    7. 压缩html
</code></pre>

<p>这些都是每个Web项目在构建、开发阶段需要做的事情。前端自动化构建环境可以把这些重复工作一次配置，多次重复执行，极大的提高开发效率。</p>
<p>Gulp是基于 Node.js的，需要要安装 Node.js</p>
<p>1、开始安装Gulp 插件</p>
<pre>npm install</pre>
<pre>
	<code>
		{
		  "name": "wechat",
		  "version": "1.0.0",
		  "description": "",
		  "main": "index.js",
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "author": "",
		  "license": "ISC",
		  "devDependencies": {
		    "browser-sync": "^2.14.0",
		    "del": "^2.2.1",
		    "gulp": "^3.9.1",
		    "gulp-autoprefixer": "^3.1.0",
		    "gulp-cache": "^0.4.5",
		    "gulp-ejs": "^2.2.0",
		    "gulp-file-include": "^0.14.0",
		    "gulp-filter": "^4.0.0",
		    "gulp-flatten": "^0.3.0",
		    "gulp-htmlmin": "^2.0.0",
		    "gulp-if": "^2.0.1",
		    "gulp-imagemin": "^3.0.2",
		    "gulp-livereload": "^3.8.1",
		    "gulp-notify": "^2.2.0",
		    "gulp-packages": "^0.2.0",
		    "gulp-plumber": "^1.1.0",
		    "gulp-prettify": "^0.5.0",
		    "gulp-rename": "^1.2.2",
		    "gulp-rev": "^7.1.0",
		    "gulp-rev-replace": "^0.4.3",
		    "gulp-sass": "^2.3.2",
		    "gulp-sourcemaps": "^1.6.0",
		    "gulp-template": "^4.0.0",
		    "gulp-uglify": "^2.0.0",
		    "q": "^1.4.1",
		    "yargs": "^4.8.1"
		  }
		}
	</code>
</pre>
<p>2、由于本文用到base 需要引入2个json文件</p>
<pre><code>
    {
    	"base":http
    	...
	}
</code></pre>

<p>3、现在，回到命令行窗口，可以直接运行gulp任务了。</p>

<pre><code>
    gulp

    这将执行定义的default任务，就和以下的命令式同一个意思

    gulp default

    当然，我们可以运行在gulpfile.js中定义的任意任务，比如，现在运行版本任务：

    gulp rev

    --w 监控html js css
    --s 打开本地环境
    --pub url(正式环境) || test(测试环境) 替换js里面的base
</code></pre>
<p>4、编译会显示Finished,如果你的JS有什么不好的地方它会提醒，避免一些不必要的错误，十分贴心</p>
<pre><code>    常见提醒：
    1.禁止在同一行声明多个变量。
    2.请使用 ===/!==来比较true/false或者数值
    3.使用对象字面量替代new Array这种形式
    4.不要使用全局函数。
    5.Switch语句必须带有default分支
    6.函数不应该有时候有返回值，有时候没有返回值。
    7.For循环必须使用大括号
    8.If语句必须使用大括号
    9.for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染。
</code></pre>