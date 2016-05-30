DevOps前端项目
=====================


Basic setup for AngularJS with RequireJS, Jasmine, Grunt, and Bower.

Simply clone the project, and you are ready to go.

#项目结构

- app
	- css
	- img
	- js
		- controllers(控制器)
		- directives(指令集)
		- filters(过滤器)
		- providers
		- services(公共服务)
		- main.js (requireJS 入口)
		- routes.js (路由)
	- lib (第三方js包) (Note that libraries can be managed using Bower)
	- partials (视图)
- node_modules	(依赖模块，本地安装时会下载依赖，没必要加到版本控制)
- scripts (本地调试脚本)
	- config
- test(测试脚本)
	- e2e
	- fixtures
	- unit (unit tests)

#前提

需要在本机安装nodejs, 具体安装方式见官网 http://nodejs.org/

#安装

> npm install -g grunt-cli

> npm install -g bower

> npm install

#运行单元测试

> grunt karma:unit

#运行项目

> node scripts/web-server.js

打开浏览器访问 http://localhost:5000/