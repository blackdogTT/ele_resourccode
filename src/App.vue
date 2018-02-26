<template>
    <div id="app">
        <my_header :seller="seller"></my_header>
        <div class="tab">
            <div class="tab-item">
                <router-link to="goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="seller">商家</router-link>
            </div>
        </div>
        <div class="content">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>

        </div>
    </div>
</template>

<script>
    import my_header from 'components/header/header.vue'

    export default {
        data(){
            return{
               seller:{

               }
            }
        },
        components: {
            my_header
        },
        created(){
            this.$http.get('/api/seller')
                .then((res) => {
                    this.seller = res.data.data;
                });

            this.$http.get('/api/ratings')
                .then((res) => {
                    this.ratings = res.data.data;
                });
        }
    }


</script>

<style lang="less" type="text/less">
    /*变量区*/
    @import "common/less/mixtin";

    /*样式区*/
    #app{
        .tab{
            display: flex;
            width: 100%;
            height: 40px;
            line-height: 40px;
            .tab-item{
                flex: 1;
                text-align: center;
                .border-1px(rgba(7,17,27,0.1));
                a{
                    display: block;
                    font-size:14px;
                    color: rgb(77,85,93);
                    &.router-link-active{
                        color: rgb(240,20,20);
                    }
                }
            }
        }
    }
</style>
