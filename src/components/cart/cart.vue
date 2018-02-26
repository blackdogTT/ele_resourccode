<template>
    <div class="cart-container">
        <div class="cart-left">
            <span class="cart-icon" :class="{'blue':selectedGood.length}" @click="showOrNot">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shopping_cart"></use>
                </svg>
            </span>
            <span class="cart-amount" :class="{'have-food':selectedGood.length}">
                ￥{{total}}
            </span>
            <span class="cart-pack-fee">
                另需配送费￥{{postage}}元
            </span>
        </div>
        <div class="cart-right" v-if="total<minimum">
            ￥{{minimum}}元起送
        </div>
        <div class="cart-right green" v-if="total>=minimum" @click="closeCount">
            去结算
        </div>
        <div class="list-wrapper" ref="wrapper" v-show="selectedGood.length && show">
            <div class="cart-list">
                <div class="cart-list-title">
                    <span>购物车</span>
                    <span @click="clear">清空</span>
                </div>
                <ul class="cart-list-items">
                    <li class="cart-list-item" v-for="item in selected" v-if="item.count">
                        <div class="goodsName">{{item.name}}</div>
                        <div class="goodsPrice"><span>￥</span>{{item.price}}</div>
                        <div class="cartCtrl">
                            <cartCtrl :food="selected[item.name]"></cartCtrl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import cartCtrl from '../cartCtrl/cartCtrl.vue'
    import {mapState,mapActions} from 'vuex'
    export default {
        data() {
            return {
                minimum: 20,
                postage: 4,
                show:false
            }
        },
        watch:{
            selectedGood:{
                handler:function (newValue) {
                    if (newValue.length===0){
                        this.show=false
                    }
                },
                deep:true
            }
        },
        computed: {
            ...mapState(['selected']),
            selectedGood:function () {
                    let arr = [];
                    for (let key in this.selected){
                        if (this.selected[key].count>0){
                            arr.push(this.selected[key]);
                        }
                    }
                    return arr;
                },
            total:function () {
                let total = 0;
                for (let key in this.selected){
                    total+=this.selected[key].count*this.selected[key].price
                }
                return total;
            }

        },

        mounted() {
            //设置幕布高度
            this.$refs.wrapper.style.height = window.innerHeight + 'px';
        },
        methods: {
            closeCount: function () {
                alert('支付' + this.total + '元')
            },
            amount: function () {
                let priceAmount = 0;
                this.selectedGood.forEach(function (t) {
                    priceAmount += t.total * t.price
                });
                this.total = priceAmount;
            },
//            显示幕布
            showOrNot: function () {
                if (this.selectedGood.length>0){
                    this.show = !this.show
                }

            },
            clear:function () {
                for (let key in this.selected){
                    this.selected[key].count = 0
                }
            }
        },
        components: {
            cartCtrl
        }
    }
</script>

<style scoped lang="less" type="text/less">
    @import "../../common/less/mixtin";

    .cart-container {
        position: fixed;
        display: flex;
        z-index: 40;
        bottom: 0;
        left: 0;
        height: 46px;
        width: 100%;
        background-color: #141d27;
        .cart-left {
            position: relative;
            z-index: 101;
            flex: 1;
            .cart-icon {
                display: inline-block;
                z-index: 100;
                margin-left: 12px;
                margin-top: -12px;
                height: 44px;
                width: 44px;
                border-radius: 50%;
                border: 6px solid #141d27;
                background-color: #2b333b;
                color: rgba(255, 255, 255, .4);
                text-align: center;
                font-size: 28px;
                line-height: 44px;
                &.blue {
                    background: #00a0dc;
                    color: white;
                }
            }
            .cart-amount {
                display: inline-block;
                margin-top: 6px;
                height: 24px;
                line-height: 24px;
                font-size: 16px;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.4);
                padding-right: 12px;
                &.have-food {
                    color: white;
                }
            }
            .cart-pack-fee {
                display: inline-block;
                margin-top: 6px;
                height: 24px;
                line-height: 24px;
                font-size: 10px;
                color: rgba(255, 255, 255, 0.4);
                padding-left: 12px;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
        .cart-right {
            position: relative;
            z-index: 101;
            display: inline-block;
            flex: 0 0 105px;
            width: 105px;
            box-sizing: border-box;
            height: 100%;
            line-height: 46px;
            padding: 0 8px;
            background-color: #2b333b;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.4);
            &.green {
                background: #00b43c;
                color: #fff;
            }
        }
        .list-wrapper {
            position: absolute;
            left: 0;
            bottom: 46px;
            z-index: 100;
            width: 100%;
            background-color: rgba(7, 17, 27, .6);
            .cart-list {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: #fff;
                .cart-list-title {
                    height: 40px;
                    width: 100%;
                    padding: 0 18px;
                    box-sizing: border-box;
                    background-color: #f3f5f7;
                    border: 1px solid rgba(7, 17, 27, .1);
                    span {
                        display: block;
                        height: 40px;
                        line-height: 40px;
                        color: #2b333b;
                        &:nth-of-type(1) {
                            float: left;
                            font-size: 14px;
                            font-weight: 200;
                            color: rgb(7, 17, 27);
                        }
                        &:nth-of-type(2) {
                            float: right;
                            font-size: 12px;
                            color: rgb(0, 160, 220);
                        }
                    }
                }
                .cart-list-items {
                    width: 100%;
                    padding: 0 12px;
                    box-sizing: border-box;
                    .cart-list-item {
                        display: flex;
                        width: 100%;
                        height: 48px;
                        line-height: 48px;

                        .goodsName {
                            flex: 1;
                            font-size: 14px;
                            color: rgb(7, 17, 27);
                        }
                        .goodsPrice {
                            flex: 1;
                            color: rgb(240, 20, 20);
                            font-size: 14px;
                            font-weight: 700;
                            margin-right: 12px;
                            text-align: right;
                            span {
                                font-size: 10px;
                                font-weight: normal;
                            }
                        }
                        .cartCtrl {
                            flex: 1;
                            text-align: right;
                        }
                    }

                }
            }
        }
    }


</style>