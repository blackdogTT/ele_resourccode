<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,key) in goods" :class="[key===goodsTypeIndex ? 'menu-selected' : '']"
                    @tap="selectedType(key)">
                    <div class="li-layout">
                        <span class="support" v-show="item.type>=0">
                    <supportIcon :supportType="item['type']"></supportIcon>
                </span>
                        <span class="text">{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
            <ul class="goods-items">
                <li class="type-items" v-for="(item,key) in goods">
                    <ul class="type-item food-list-hook">
                        <span class="title">{{item.name}}</span>
                        <li class="goods-item" v-for="food in item.foods" @tap="showDetail(food)">
                                <div class="goods-avatar">
                                <img :src="food.icon" alt="" width="57" height="57">
                            </div>
                            <div class="detail">
                                <div class="goods-title">{{food.name}}</div>
                                <p v-show="food.description">{{food.description}}</p>
                                <p>
                                    <span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                                </p>
                                <div class="price-detail">
                                    <span class="price">￥{{food.price}}</span><span class="oldPrice"
                                                                                    v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                    <div class="button" ref="button">
                                        <cartCtrl :food="selected[food.name]"></cartCtrl>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <cart class="cart"></cart>
        <transition name="rightIn">
            <food :food="foodSelected" :ratings="foodSelected.ratings" v-show="detailFlag"
                  v-on:close="closeDetail"></food>
        </transition>
    </div>
</template>

<script>
    import supportIcon from '../support-icon/support-icon.vue'
    import cart from '../cart/cart.vue'
    import cartCtrl from '../cartCtrl/cartCtrl.vue'
    import food from '../food/food.vue'
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                goodsTypeIndex: 0,
                goodsTypeHeight: [],
                foodSelected: {},
                detailFlag: false
            }
        },
        computed: {
            ...mapState(['goods', 'selected']),
            selectedGoods: function () {
                let arr = [];
                this.goods.forEach(function (item) {
                    item.foods.forEach(function (item1) {
                        if (item1.count !== 0) {
                            arr.push(item1)
                        }
                    })
                });
                return arr
            },
        },
        methods: {
            ...mapActions(['init']),
//            初始化高度区间
            initHeightArr:function () {
                if (this.goodsTypeHeight.length===0){
                    //                获得高度区间
                    let foodTypes = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
                    let initHeight = 0;
                    for (let i = 0; i < foodTypes.length; i++) {
                        initHeight += foodTypes[i].offsetHeight;
                        this.goodsTypeHeight.push(initHeight);
                    }
                }
                else {
                    return false
                }
            },
//            初始化scroll对象
            scrollInit: function () {
                this.scrollGoods = new this.$bs(this.$refs.goodsWrapper, {
                    probeType: 3,
                    swipeTime: 2500,
                    deceleration: 0.001,
                    tap: true
                });
                this.scrollMenu = new this.$bs(this.$refs.menuWrapper, {
                    tap: true
                });
            },
//            绑定滑动foods菜单事件
            calculateHeight: function () {
//                实时获取滑动值
                this.scrollGoods.on('scroll', (pos) => {
                    this.initHeightArr();
                    let scrollY = -pos.y;
                    this.goodsTypeIndex = 0;

                    for (let i = 0; i < this.goodsTypeHeight.length; i++) {
                        if (scrollY >= this.goodsTypeHeight[i] && i + 1 !== this.goodsTypeHeight.length) {
                            this.goodsTypeIndex = i + 1;
                        }
                    }

                })
            },
//            选中左侧商品类型
            selectedType: function (key=0) {
                this.initHeightArr();
                this.goodsTypeIndex = key;
//              联动右边
                if (key === 0) {
                    this.scrollGoods.scrollTo(0, 0);
                }
                else {
                    this.scrollGoods.scrollTo(0, -this.goodsTypeHeight[key - 1]);
                }
            },
//            展开详情,传入一个对象
            showDetail: function (food) {
                this.foodSelected = this.selected[food.name];
                this.detailFlag = true
            },
//            收到子组件关闭事件后关闭详情页
            closeDetail: function () {
                this.detailFlag = false;
            }
        },

        created: function () {
//            数据请求
            this.init();
            this.$nextTick(
                function () {
                    this.scrollInit();
                    this.calculateHeight();
                }
            )
        },
        components: {
            supportIcon,
            cart,
            cartCtrl,
            food
        }
    }
</script>

<style lang="less" type="text/less">
    @import "../../common/less/mixtin";

    .goods {
        display: flex;
        position: absolute;
        top: 176px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background-color: #f3f5f7;
            ul {
                width: 100%;
                li {
                    &.menu-selected {
                        color: rgb(240, 20, 20);
                        background-color: #fff;
                        font-weight: 700;
                    }
                    display: table;
                    border-spacing: 12px;
                    width: 100%;
                    height: 54px;
                    line-height: 14px;
                    .li-layout {
                        display: table-cell;
                        vertical-align: middle;
                        .support {
                            display: inline-block;
                            vertical-align: middle;
                            height: 14px;
                            width: 14px;
                        }
                        .text {
                            font-size: 12px;
                            font-weight: 200;
                        }
                    }

                }
            }

        }
        .goods-wrapper {
            flex: 1;
            .goods-items {
                position: relative;
                .type-items {
                    .type-item {
                        .title {
                            display: block;
                            width: 100%;
                            height: 26px;
                            line-height: 26px;
                            padding-left: 14px;
                            font-size: 12px;
                            color: rgb(147, 153, 159);
                            font-weight: normal/700;
                            border-left: 2px solid #d9dde1;
                            background-color: #f3f5f7;

                        }
                        .goods-item:last-of-type {
                            border-bottom: none;
                        }
                        .goods-item {
                            position: relative;
                            display: flex;
                            padding: 18px 0;
                            margin: 0 18px;
                            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                            & > div {
                                display: inline-block;
                                vertical-align: middle;
                            }
                            .avatar {
                                flex: 1 1 57px;
                                height: 57px;
                            }

                            .detail {
                                flex: 1;
                                padding-left: 10px;
                                & > p {
                                    font-size: 10px;
                                    line-height: 10px;
                                    color: rgb(147, 153, 159);
                                    margin-top: 8px;
                                }
                                .goods-title {
                                    font-size: 14px;
                                    margin-top: 2px;
                                    color: rgb(7, 17, 27);
                                }
                                .price-detail {
                                    margin-top: 8px;
                                    color: rgb(147, 153, 159);
                                    vertical-align: middle;
                                    .price {
                                        color: rgb(240, 20, 20);
                                        margin-right: 8px;
                                        font-size: 14px;
                                        line-height: 14px;
                                    }
                                    .oldPrice {
                                        font-size: 10px;
                                        text-decoration: line-through;
                                    }
                                    .sellCount {
                                        margin-right: 12px;
                                    }
                                    .button {
                                        position: absolute;
                                        display: inline-block;
                                        bottom: 18px;
                                        right: 0;
                                        font-size: 0;
                                    }
                                }

                            }

                        }
                    }
                }
            }

        }
    }

    /*动画*/
    .rightIn-enter-active, .rightIn-leave-active {
        transition: all .5s linear;
    }

    .rightIn-enter, .rightIn-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>