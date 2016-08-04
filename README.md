<h2>前端自动化gulp环境搭建</h2>

<p>为了UED前端团队更好的协作开发同时提高项目编码质量，我们需要将Web前端使用工程化方式构建；</p>

<p>目前需要一些简单的功能：</p>

<pre><code>    
	1. 版本控制
    5. 编译SASS
    2. 检查文件
    3. 图片合并
    4. 压缩CSS
    6. 压缩JS
    7. 压缩html
</code></pre>

<p>这些都是每个Web项目在构建、开发阶段需要做的事情。前端自动化构建环境可以把这些重复工作一次配置，多次重复执行，极大的提高开发效率。</p>
<p>Gulp是基于 Node.js的，需要要安装 Node.js</p>
<p>1、为了确保依赖环境正确，我们先执行几个简单的命令检查。</p>
<pre><code>    
	node -v
    Node是一个基于Chrome JavaScript V8引擎建立的一个解释器
    检测Node是否已经安装，如果正确安装的话你会看到所安装的Node的版本号
</code></pre>
<p>2、接下来看看npm，它是 node 的包管理工具，可以利用它安装 gulp 所需的包</p>
<pre><code>    npm -v
    这同样能得到npm的版本号，装 Node 时已经自动安装了npm
</code></pre>

<p>3、下载本文的文件</p>

<p>4、开始安装Gulp</p>
<pre><code>    
	npm install -g gulp
    全局安装 gulp

    npm install gulp
    局部安装

    gulp -v
    得到gulp的版本号，确认安装成功
</code></pre>

<h2>基础安装结束</h2>


<p>5、开始安装Gulp 插件</p>
<pre>
	<code>
		{
		  "name": "a",
		  "version": "1.0.0",
		  "description": "",
		  "main": "gulpfile.js",
		  "dependencies": {
		    "del": "^2.2.1",
		    "browser-sync": "^2.12.12",
		    "gulp": "^3.9.1",
		    "gulp-autoprefixer": "^3.1.0",
		    "gulp-imagemin": "^3.0.2",
		    "gulp-clean-css": "^2.0.11",
		    "gulp-htmlmin": "^2.0.0",
		    "gulp-cache": "^0.4.5",
		    "gulp-packages": "^0.2.0",
		    "gulp-rename": "^1.2.2",
		    "gulp-plumber": "^1.1.0",
		    "gulp-rev": "^7.1.0",
		    "gulp-uglify": "^1.5.4",
		    "gulp-sass": "^2.3.2",
		    "gulp-rev-replace": "^0.4.3",
		    "gulp-watch": "^4.3.9",
		    "q": "^1.4.1",
		    "htmlmin": "^0.0.6"
		  },
		  "devDependencies": {},
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "author": "",
		  "license": "ISC"
		}
	</code>
</pre>
<p>6、由于本文用到base 需要引入2个json文件</p>
<pre><code>
    {
    	"base":http,
    	"url":url
    	...
	}
</code></pre>

<p>7、现在，回到命令行窗口，可以直接运行gulp任务了。</p>

<pre><code>
    gulp

    这将执行定义的default任务，就和以下的命令式同一个意思

    gulp default

    当然，我们可以运行在gulpfile.js中定义的任意任务，比如，现在单独运行sass任务：

    gulp sass
</code></pre>
<p>8、编译会显示Finished,如果你的JS有什么不好的地方它会提醒，避免一些不必要的错误，十分贴心</p>
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

<h3>Use Git as a project management tool</h3>
<pre><code>
	安装git， 下载安装包会安装好 Git Shell 和可视化环境

    http://git-scm.com/download/win

配置用户名：

    git config --global user.name "Your Name"
    git config --global user.email "email@example.com"

关联一个到团队的库

    git remote add origin git@github.com:markyun/My-blog.git

添加文件到仓库，添加全部文件用 . 表示

    git add .

把文件提交到仓库

    git commit -m " first add project file"

抓取仓库中的文件更新

	git pull " first add project file"

提交文件到团队仓库

    git push -u origin master //将本地的项目提交到远程仓库中。

</code></pre>
