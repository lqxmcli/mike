<template>
      <div id='tmpl'>
           <div id='desc'>
               <div class='title'>
               <h4>{{photoinfo.title}}</h4>
                <p>
                    {{photoinfo.add_time |datefmt('YYYY-MM-DD')}} {{photoinfo.click}}次浏览
                </p>
                <p class='line'></p>
   
               </div>
               <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		             <router-link to="/news/newslist">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻</div>
		            </router-link>
		           </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <router-link to="/photo/photolist">
		                    <span class="mui-icon mui-icon-email">
		                    </span>
		                    <div class="mui-media-body">图片分享</div>
		             </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		              <router-link to="/goods/goodslist">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品购买</div>
		                    </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		              <router-link to="/feedback">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div>
		               </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		               <router-link to="/vide">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div>
		                    </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/callme">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div>
		                    </router-link>
		            </li>
		            
		        </ul> 
		    </div>
		    <p v-html='photoinfo.content'></p>
   
           </div>

           

           <div id='comment'>

               <comment :id='id'></comment>
           </div>


      </div>
</template>
<script>
import comment from '../subcome/comment.vue'
import {Toast} from 'mint-ui'
  export default{
  components:{
   comment
  },
    data(){
       return {
       id:0,
       photoinfo:{

       }
       }
    },
    created(){
    this.id=this.$route.params.id;
    this.getinfo();
    },
    methods:{
       getinfo(){
         var url=this.$common.apidomain+'/api/getimageinfo/'+this.id;
         this.$http.get(url).then(function(res){
           var body=res.body
             if(res.body.status!=0){
              Toast(res.body.message);
              return;
            }
            this.photoinfo=body.message[0];

         })
       }
    }
  }
</script>
<style scoped>
#desc{
	padding:10px;
}

 #desc .title h4{
 color:#0094ff;
 }

 #desc .title p{
 color:rgba(0,0,0,0.3);
 margin-top:5px;
 }

 #desc .title .line{
   width:100%;
   height:1px;
   border-bottom:1px solid rgba(0,0,0,0.3);
 }


   .mui-content,mui-content ul{
      background-color:#fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
      border-right:0px;
      border-bottom:0px;
    }
    .mui-grid-view.mui-grid-9{
      border-top:0px;
      border-left:0px;
    }
</style>