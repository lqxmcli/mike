<template>
  <div id='tmpl'>
      <div id='cate'>
         <ul v-bind="{style:'width:'+ ulWidth+'px'}">
           <li>全部</li>
            <li v-for='item in cates'>{{item.title}}</li>
         </ul>

      </div>
      <div id='imglist'>
            <ul>
              <li v-for="item in list">
               <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                <img v-lazy="item.img_url">
                <div id='desc'>
                  <h5 v-text='item.title'></h5>
                  <p v-text='item.zhaiyao'></p>

                </div>
                </router-link>
              </li>
           </ul>

      </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  export default{
      data(){
      return {
        ulWidth:320,
        cates:[],
        list:[]
      }
      },
      created(){
       this.getcates();
       var all=0;
       this.getimages(all);
      },
      methods:{
          getimages(cateid){
          cateid=cateid||0;
            var url=this.$common.apidomain+'/api/getimages/'+cateid;
            this.$http.get(url).then(function(res){
            var body=res.body
             if(res.body.status!=0){
              Toast(res.body.message);
              return;
            }
             this.list=body.message;

            })

          },
          getcates(){
          var url=this.$common.apidomain+'/api/getimgcategory';
          this.$http.get(url).then(function(res){
            if(res.body.status!=0){
              Toast(res.body.message);
              return;
            }
            this.cates=res.body.message;
            var w=62;
            var count=res.body.message.length+1
            this.ulWidth=count*w

          })

      }
      }
  }
</script>
<style scoped>


   #cate{
    width:375px;
    max-width:375px;
    overflow-x:auto;
   }

   #cate ul{
   margin:0px;
   
   padding-left:10px;
   }

   #cate li{
   list-style:none;
   display:inline-block;
   color:#0094ff;
   font-size:14px;
   padding-left:6px;
   padding-bottom:10px;
   }

   #imglist{

   }
   #imglist ul{
    padding-left:0px;
   }

   #imglist li{
     list-style:none;
     position:relative;
   }

   #imglist img{
     width:100%;
     height:400px; 

   }

   #desc{
   width:100%;
   background-color:rgba(0,0,0,0.2);
   position:absolute;
   bottom:2px;
   left:0px;
   }
   #desc h5{
   color:#fff;
   font-weight:bold;
   }

    #desc p{
    color:#fff;
    }
</style>