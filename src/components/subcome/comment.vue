<template>
    <div id='tmpl'>
      <div id='postcomment'>
      <h3>提交评论</h3>
      <p></p>
      <textarea placeholder='请输入您要提交的内容....'  v-model='postcontent'></textarea>
      <mt-button type="primary" size="large" @click='postcomment'>提交</mt-button>
      </div>
     <div id='list'>
        <h3>评论列表</h3>
        <p ></p>
        <div v-for='(item,index) in list'>
          <div class="title">
				<span>第{{index+1}}楼:</span>
				<span>用户:{{item.user_name}}</span>
				<span>发表时间:{{item.add_time |datefmt('YYYY-MM-DD') }}</span>
			</div>
			<ul class="mui-table-view">
				 <li class="mui-table-view-cell">{{item.content}}</li>
		    </ul>
          </div>
       </div>
       <mt-button type="primary" size="large" plain @click='getmore' >加载更多</mt-button>
    </div>
</template>
<script>
   import {Toast} from 'mint-ui';
   export default{
      data(){
       return{
          pageindex:1,
         postcontent:"",
         list:[]
       }
      },
       props:['id'],
       created(){
        this. getcommentlist(this.pageindex);
       },
       methods:{
         getmore(){
           this.pageindex++;
           this.getcommentlist(this.pageindex);
         },
         getcommentlist(pageindex){
           pageindex=pageindex||1;
           var url=this.$common.apidomain+'/api/getcomments/'+this.id+'?pageindex='+pageindex;
           this.$http.get(url).then(function(res){
              if(res.body.status!=0){
              Toast(res.body.message);
              return;
              }
             this.list=this.list.concat(res.body.message);
           })


         },
         postcomment(){
           if(this.postcontent.trim().length<=0){
             Toast('评论的数据不能为空');
             return;

           }
           var url=this.$common.apidomain+'/api/postcomment/'+this.id;
           this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
             Toast(res.body.message);
            this.list=[
                      {"user_name":"匿名用户",
                      "add_time":new Date(),
                      "content":this.postcontent}

            ].concat(this.list)

             this.postcontent='';

           }) 

         }
       }
   }
</script>
<style scoped>
 #postcomment {
   padding:5px;
 }

  p{
 height:1px;
 width:100%;
 border-bottom:1px solid rgba(0,0,0,0.2);
 }
 #list{
 padding:5px;
 }

          .title{
				padding:5px;
				color: #6d6d72;
				font-size: 15px;
				background-color:rgba(0,0,0,0.1);
			}

</style>