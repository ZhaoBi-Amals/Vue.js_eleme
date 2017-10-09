# Vue.js-饿了么实战-新手向
## 前置要求
1、Vue基础知识 参考官网。~~~一直看到看不懂了就行，边做边学才重要~~~ <br />
2、vue-cli 会用命令行工具新建一个项目、运行一个项目<br />
3、npm/cnpm 花个十分钟了解下<br />
## 项目运行
新手向：<br />
先安装：node、vue、vue-cli;<br />
下载项目;<br />
然后在(mac)terminal下：<br />
```
//用cd指令进入项目文件夹，再输入：
npm run dev
```
## 项目预览
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/eleme1.gif)
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/eleme2.gif)
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/eleme3.gif)
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/eleme4.gif)
## 项目分析

### 组件化开发
简单的讲，诸如页面中的‘⊕’标签、购物车、食物详情弹出框等等都是组件。哪里要用到它们，就在哪里引入它们，就像搭积木一样。我们要做的就是写好一个个的组件，再把这些组件一一加载在页面上。<br />

### 页面分析
整个demo分成5个部分：<br />
1、页面header部分：<br />
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/1.png)<br />
2、中间的container部分：<br />
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/2.png)<br />
3、底下的shoppingCart部分：<br />
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/3.png)<br />
4、弹出的bulletin部分：<br />
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/4.png)<br />
5、商品的pop-up层：（这里和慕课网的教程不一样，我是直接照着官网上的效果写的）<br />
![Image text](https://github.com/wengzs/Vue.js_eleme/blob/master/introduction_gif/5.png)<br />

### 项目构思
#### 有多少个page?<br />
这是个单页的demo<br />
#### 最主要的交互有哪些？<br />
header --> bulletin （点击header中的某些元素弹出bulletin页面，下同）<br />
container --> 商品、评价、商家<br />
container --> pop-up商品详情层<br />
shoppingCart --> 弹出框<br />
+、- 标签 --> 购买、移除商品<br />
#### 需要用到的技能：<br />
- 基础要求：js(es6) / css / html<br />
- 增加效率的：<br />
css: less/sass/stylus<br />
js: jQuery<br />
- Vue相关的：<br />
脚手架工具：vue-cli<br />
模板：webpack<br />
vue官方文档：基础部分、component（组件）、transition（组件切换动画）<br />
组件切换：vue-router<br />
组件之间通信：vue-bus / vuex<br />
- 额外的<br />
ajax：axios<br />
##### 了解了这些之后，就可以开始写项目了。在需要用到以上这些技能的时候，就勇敢的去把它点亮就好。<br />

### 写大框框
个人习惯先把最主要的大框框写了，再往里面填细节。<br />
#### 写page
由于这个demo只有一个页面，所以在用vue-cli新建了一个webpack项目之后，直接用项目中默认的 app.vue 作为主页面就行。<br />
ps：建议将src目录下除了app.vue和main.js之外的所有文件删除。然后在src下新建：component(组件)、route(路由)、stylus(公共样式；或者less/sass等，看用的什么就写什么)、common(公用资源)，一个简单的项目目录就搞定了<br />
#### 关于Vue全家桶的那些事
Vue全家桶包括Vue-router、Vuex、axios以及构架工具Vue-cli
首先我们得了解一些组件的知识，在翻阅了官方文档之后，相信大家都跃跃欲试。<br />
那么问题来了，怎么样写一个组件出来呢？<br />
相信你需要一个手把手教你怎么做的教程，好巧我这里写了一个:(害羞脸 <br />
点击：https://github.com/wengzs/theory_of_Vue/blob/master/Vue-component.md
接着我们再把官方的vue-router文档也看了一遍。当然问题又来了，怎么写个能用的路由出来呢？<br />
点击：https://github.com/wengzs/theory_of_Vue/blob/master/Vue-router.md
不急，你一定会遇到非父子组件通信的问题，当然是继续看教程咯：
点击：
#### 写组件


#### 改BUG
















