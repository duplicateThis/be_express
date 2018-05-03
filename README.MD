## 启动服务
1. npm i （已安装node_modules的请忽略）
2. DEBUG=node-frame1:* npm start

可以在控制台看到服务启动成功的提示，如果本地数据库服务也打开了的话，还会看到数据库连接成功的提示。

已经安装服务器监视依赖。修改代码并保存后，服务会自动重启，无需手动重启。

默认本地端口3000，可以在 app.js 中进行修改。






## mongodb数据库连接
#### 连接
+ 使用mongoose进行与mongodb的连接
+ mongodb => db.js 对数据库连接进行设置,设置所连接的数据库地址

	```
	mongoose.connect('mongodb://127.0.0.1:27017/data_a');
	```






## 静态资源位置
静态资源位置已经设置好。以vue为例：
1. vue做好的前端网页，进行 npm run build 后生成打包后文件夹 dist 
2. 将dist文件夹下的所有文件粘贴到public下就可以了（原public下的所有文件夹可选择保留或者删除）







## 定义模型
在models文件夹下进行数据库模型定义。

1. example中，定义了一个nameSchema，它的作用是定义数据储存的形式，以键值对的形式书写。schema不具备操作数据库的能力。
	+ 键是字符串，相当于数据字段
	+ 值定义要储存的数据类型
2. 以nameSchema为原型生成一个model并导出，model具有操作数据库的能力。
3. 在需要用到数据库的controller里，引入对应的model，便可以对数据库进行操作了。
	
	```
	// controllers/example.js 中，以 Name 进行数据库的操作
	import Name from '../models/example.js';
	```





## 操作数据库
使用mongoose进行mongodb的操作十分简单。






## contollers
该文件夹下进行具体处理controller的定义。

可以用构造函数的方式去定义，然后输出实例。

##### 两种输出方式
+ 直接输出一个处理函数，在 routes/index.js 中引入，如 controller/example.js
+ 输出一个对象，对象中可包含多个处理函数，然后在 routes/index.js 中引入，如 controller/example_son.js

输出后在路由文件中添加相应路由响应。





## 请求与响应
路由的响应方法一共有3个参数， **req，res，next**

##### req 请求体 
req请求体用来获取请求数据（前端发送过来的数据），一般常用的也就2种方法
+ req.query 获取get请求数据
+ req.body 获取post请求数据

##### res 响应体
res响应体用来给前端发送数据，常用1种方法就可以了。进行相应后，该处理函数结束，不再往后执行。
+ res.send，发送各种类型的响应
	
	```
	// get请求例
	// 前端发送的数据
	this.$http.get('http://localhost:3000/getName', {
        params: {
          name: 'lili'
        }
    })
	// controller中获取数据并响应
	module.exports = (req, res) => {
		let name = req.query.name;
		res.send('success')
	} 
	```

	```
	// post请求例
	// 前端发送的数据
	this.$http.post('http://localhost:3000/getName', {
        params: {
          name: 'lili'
        }
    })
	// controller中获取数据
	module.exports = (req, res) => {
		let name = req.body.name;
		res.send('success');
		// 已经进行res响应了，之后的代码不会被执行
		let a = 1;
		console.log(a)
	} 
	```

##### next
添加next参数并使用next()后，使得响应能够从一个中间件（处理函数）前往下一个中间件。next()添加任何参数后便终结，不会再进行跳转。

具体见例子 controllers/example_next.js。

```
// controllers/example_next.js
module.exports = (req, res, next) => {
	let a = 1;
	console.log(a);
	next()
} 
```

```
// routes/index.js
app.get('/next', example_next, example);
```

/next路由响应后，先执行 controllers/example_next.js 在控制台输出 1，然后跳转到 controllers/example.js 执行，最终返回 example 字样。






## routes/index.js
这个文件中要做的事情很简单，就2件：
1. 引入controller
	
	```
	import example from '../controllers/example.js';
	import example_son from '../controllers/example_son.js';
	import example_next from '../controllers/example_next.js';
	```
2. 定义响应路由：路由路径 & 响应方法

	```
	app.get('/example', example);
	app.get('/son', example_son.son);
	app.get('/next', example_next, example);
	```






## views文件夹
这里用来存放后端渲染页面的模板，暂时不用吧
