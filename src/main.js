// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 利用Vue对象进行解析渲染
import vueRouter from 'vue-router';
Vue.use(vueRouter);
import  home from './components/home.vue';
import  shopcar from './components/shopcar/car.vue';
import  newlist from './components/news/newslist.vue';
import  newsinfo from './components/news/newsinfo.vue';
import  photolist from './components/photo/photolist.vue';
import  photoinfo from './components/photo/photoinfo.vue';


var router1=new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
	{path:'/',redirect:'/home'},
	{path:'/home',component:home},
    {path:'/shopcar',component:shopcar},
    {path:'/news/newslist',component:newlist},
     {path:'/news/newsinfo/:id',component:newsinfo},
     {path:'/photo/photolist',component:photolist},
     {path:'/photo/photoinfo/:id',component:photoinfo}
	]
});
import 'mint-ui/lib/style.min.css'
import mintui from 'mint-ui/';
Vue.use(mintui);
import '../statics/css/site.css'
import '../statics/mui/css/mui.css'


import vueResource from 'vue-resource';
Vue.use(vueResource);

import moment from 'moment';

Vue.filter('datefmt',function(input,fmtstring){
	return moment(input).format(fmtstring)

})

import common from './tools/common.js'
Vue.prototype.$common=common;

new Vue({
	el:'#app',
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});
