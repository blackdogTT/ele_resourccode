<template>
    <div class="food" ref="foodDetail" v-show="detailFlag">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @tap="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-arrow_lift"></use>
                    </svg>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售 {{food.sellCount}} </span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥26</span><span v-show="false" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartCtrl :food="food" v-show="food.count"></cartCtrl>
                </div>
                <transition name="fade">
                    <div class="buy" v-show="!food.count" @tap="addItem(food)">加入购物车</div>
                </transition>
            </div>
            <split></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品信息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <ratingSelect :ratings="ratings" v-on:selectRating="ratingMap" v-on:blankFilter="changeFlag"></ratingSelect>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-for="rating in realRatings"
                            class="rating-item border-1px rating-hook" :type="rating.rateType" :blank="rating.text">
                            <div class="user">
                                <span class="name">{{rating.username}} </span>
                                <img :src="rating.avatar" class="avatar" width="12" height="12">
                            </div>
                            <div class="time">{{rating.rateTime}}</div>
                            <div class="text">
                                <svg class="icon icon-thumb_up" aria-hidden="true" v-if="rating.rateType === 0">
                                    <use xlink:href="#icon-thumb_up"></use>
                                </svg>
                                <svg class="icon icon-thumb_down" aria-hidden="true">
                                    <use xlink:href="#icon-thumb_down" v-if="rating.rateType === 1"></use>
                                </svg>
                                {{rating.text}}
                            </div>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import split from '../split/split.vue'
    import ratingSelect from '../ratingSelect/ratingSelect.vue'
    import cartCtrl from '../cartCtrl/cartCtrl.vue'
    import {mapState, mapActions} from 'vuex'
    export default {
        data(){
            return {
                selectedStatus: 'all',
                flag: 'hide',
                detailFlag:''
            }
        },
        props:{
            food:{
                type:Object
            },
            ratings:{
                type:Array,
                default:function () {
                    return []
                }
            }
        },

        computed:{
//            购物车中物品
            ...mapState(['selected']),

//            评论过滤器
            realRatings: function () {
//                两层过滤器
                return this.blankFilter(this.typeFilter(this.ratings, this.selectedStatus), this.flag)
            }
        },

        methods:{
//            移入vuex添加数量的方法
            ...mapActions(['addItem']),
            initScroll:function () {
                this.detailScroll = new this.$bs(this.$refs.foodDetail,{
                    probeType: 3,
                    swipeTime: 2500,
                    deceleration: 0.001,
                    tap: true
                })
            },
            close:function () {
                this.$emit('close');
            },

//            评论类型过滤
            typeFilter: function (ratings, type) {
                if (type === 'all') {
                    return ratings
                }
                else if (type === 'good') {
                    let arr = [];
                    ratings.forEach(function (t) {
                        if (t.rateType == 0) {
                            arr.push(t);
                        }
                    });
                    return arr;
                }
                else if (type === 'bad') {
                    let arr = [];
                    ratings.forEach(function (t) {
                        if (t.rateType == 1) {
                            arr.push(t);
                        }
                    });
                    return arr;
                }
            },
//            过滤空评论
            blankFilter: function (ratings, flag) {
                if (flag === 'show') {
                    let arr = [];
                    ratings.forEach(function (t) {
                        arr.push(t);
                    });
                    return arr
                }
                else if (this.flag === 'hide') {
                    let arr = [];
                    ratings.forEach(function (t) {
                        if (t.text !== '') {
                            arr.push(t);
                        }
                    });
                    return arr
                }
            },
//          改变评论按钮的样式
            ratingMap: function (type) {
                this.selectedStatus = type
            },

            changeFlag: function (flag) {
                this.flag = flag;
            }
        },
        created:function () {
            this.$nextTick(
                ()=>{
                    this.initScroll()
                }
            )
        },

        components:{
            split,
            ratingSelect,
            cartCtrl
        }
    }
</script>

<style lang="less" type="text/less">
    @import "../../common/less/mixtin";

    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 46px;
        z-index: 30;
        width: 100%;
        background: #fff;
        .food-content {
            .image-header {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .back {
                    position: absolute;
                    top: 10px;
                    left: 0;
                    svg {
                        display: block;
                        padding: 10px;
                        font-size: 20px;
                        color: #fff;
                    }
                }
            }
            .content {
                padding: 18px;
                position: relative;
                .title {
                    line-height: 14px;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(7, 17, 27);
                }
                .detail {
                    margin-bottom: 18px;
                    line-height: 10px;
                    height: 10px;
                    font-size: 0;
                    .sell-count, .rating {
                        font-size: 10px;;
                        color: rgb(147, 153, 159);
                    }
                    .sell-count {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
                .buy {
                    position: absolute;
                    right: 18px;
                    bottom: 18px;
                    z-index: 10;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    border-radius: 12px;
                    font-size: 10px;
                    color: #fff;
                    background: rgb(0, 160, 220);
                    &.fade-enter-active, &.fade-leave-active {
                        transition: opacity .5s
                    }
                    &.fade-enter, &.fade-leave-active {
                        opacity: 0
                    }
                }
            }
            .info {
                padding: 18px;
                .title {
                    line-height: 14px;
                    margin-bottom: 6px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .text {
                    line-height: 24px;
                    padding: 0 8px;
                    font-size: 12px;
                    color: rgb(77, 85, 93);
                }
            }
            .rating {
                padding-top: 18px;
                .title {
                    line-height: 14px;
                    margin-left: 18px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .rating-wrapper {
                    padding: 0 18px;
                    .rating-item {
                        position: relative;
                        padding: 16px 0;
                        .border-1px(rgba(7, 17, 27, .1));
                        .user {
                            position: absolute;
                            right: 0;
                            top: 16px;
                            line-height: 12px;
                            font-size: 0;
                            .name {
                                display: inline-block;
                                vertical-align: top;
                                margin-right: 6px;
                                font-size: 10px;
                                color: rgb(147, 153, 159);
                            }
                            .avatar {
                                border-radius: 50%;
                            }
                        }
                        .time {
                            margin-bottom: 6px;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                        .text {
                            line-height: 16px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                            .icon-thumb_up, .icon-thumb_down {
                                margin-right: 4px;
                                line-height: 16px;
                                font-size: 12px;
                            }
                            .icon-thumb_up {
                                color: rgb(0, 160, 220);
                            }
                            .icon-thumb_down {
                                color: rgb(147, 153, 159);
                            }
                        }
                    }
                    .no-rating {
                        padding: 16px 0;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>