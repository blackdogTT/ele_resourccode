<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{ seller.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingSelect :ratings="ratings" v-on:selectRating="ratingFilter"
                          v-on:blankFilter="changeFlag"></ratingSelect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in realRatings" class="rating-item border-1px rating-hook" :type="rating.rateType"
                        :blank="rating.text">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28">
                        </div>
                        <div class="content">
                            <h1 class="name">{{ rating.username }}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}</span>
                            </div>
                            <p class="text">{{ rating.text }}</p>
                            <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                                <!--赞和踩的图像-->
                                <span v-for="item in rating.recommend" class="item">{{ item }}</span>
                            </div>
                            <div class="time">
                                {{ rating.rateTime}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import split from '../split/split.vue'
    import star from '../star/star.vue'
    import ratingSelect from '../ratingSelect/ratingSelect.vue'


    export default {
        data() {
            return {
                seller: {
                    "name": "粥品香坊（回龙观）",
                    "description": "蜂鸟专送",
                    "deliveryTime": 38,
                    "score": 4.2,
                    "serviceScore": 4.1,
                    "foodScore": 4.3,
                    "rankRate": 69.2,
                    "minPrice": 20,
                    "deliveryPrice": 4,
                    "ratingCount": 24,
                    "sellCount": 90,
                    "bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
                    "supports": [
                        {
                            "type": 0,
                            "description": "在线支付满28减5"
                        },
                        {
                            "type": 1,
                            "description": "VC无限橙果汁全场8折"
                        },
                        {
                            "type": 2,
                            "description": "单人精彩套餐"
                        },
                        {
                            "type": 3,
                            "description": "该商家支持发票,请下单写好发票抬头"
                        },
                        {
                            "type": 4,
                            "description": "已加入“外卖保”计划,食品安全保障"
                        }
                    ],
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
                    "pics": [
                        "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
                        "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
                        "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
                        "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
                    ],
                    "infos": [
                        "该商家支持发票,请下单写好发票抬头",
                        "品类:其他菜系,包子粥店",
                        "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
                        "营业时间:10:00-20:30"
                    ]
                },
                ratings: [
                    {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "deliveryTime": 30,
                        "score": 5,
                        "rateType": 0,
                        "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": [
                            "南瓜粥",
                            "皮蛋瘦肉粥",
                            "扁豆焖面",
                            "娃娃菜炖豆腐",
                            "牛肉馅饼"
                        ]
                    },
                    {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "score": 4,
                        "rateType": 0,
                        "deliveryTime": "",
                        "text": "服务态度不错",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": [
                            "扁豆焖面"
                        ]
                    },
                    {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "score": 3,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "1******c",
                        "rateTime": 1469261864000,
                        "deliveryTime": 20,
                        "score": 5,
                        "rateType": 0,
                        "text": "良心店铺",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "2******d",
                        "rateTime": 1469251264000,
                        "deliveryTime": 10,
                        "score": 4,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "9******0",
                        "rateTime": 1469241964000,
                        "deliveryTime": 70,
                        "score": 1,
                        "rateType": 1,
                        "text": "送货速度蜗牛一样",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "d******c",
                        "rateTime": 1469231964000,
                        "deliveryTime": 30,
                        "score": 5,
                        "rateType": 0,
                        "text": "很喜欢的粥店",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "2******3",
                        "rateTime": 1469221264000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "量给的还可以",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "3******8",
                        "rateTime": 1469211964000,
                        "deliveryTime": "",
                        "score": 3,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "a******a",
                        "rateTime": 1469201964000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "孩子喜欢吃这家",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": [
                            "南瓜粥"
                        ]
                    },
                    {
                        "username": "3******3",
                        "rateTime": 1469191264000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "粥挺好吃的",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "t******b",
                        "rateTime": 1469181964000,
                        "deliveryTime": "",
                        "score": 3,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "f******c",
                        "rateTime": 1469171964000,
                        "deliveryTime": 15,
                        "score": 5,
                        "rateType": 0,
                        "text": "送货速度很快",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "k******3",
                        "rateTime": 1469161264000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "u******b",
                        "rateTime": 1469151964000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "下雨天给快递小哥点个赞",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "s******c",
                        "rateTime": 1469141964000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "好",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "z******3",
                        "rateTime": 1469131264000,
                        "deliveryTime": "",
                        "score": 5,
                        "rateType": 0,
                        "text": "吃了还想再吃",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "n******b",
                        "rateTime": 1469121964000,
                        "deliveryTime": "",
                        "score": 3,
                        "rateType": 1,
                        "text": "发票开的不对",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "m******c",
                        "rateTime": 1469111964000,
                        "deliveryTime": 30,
                        "score": 5,
                        "rateType": 0,
                        "text": "好吃",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "l******3",
                        "rateTime": 1469101264000,
                        "deliveryTime": 40,
                        "score": 5,
                        "rateType": 0,
                        "text": "还不错吧",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "3******o",
                        "rateTime": 1469091964000,
                        "deliveryTime": "",
                        "score": 2,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "3******p",
                        "rateTime": 1469081964000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "很喜欢的粥",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "o******k",
                        "rateTime": 1469071264000,
                        "deliveryTime": "",
                        "score": 5,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    },
                    {
                        "username": "k******b",
                        "rateTime": 1469061964000,
                        "deliveryTime": "",
                        "score": 4,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
                        "recommend": []
                    }
                ],
                selectedStatus: 'all',
                flag: 'hide'
            }
        },
        computed: {
            realRatings: function () {
                return this.blankFilter(this.typeFilter(this.ratings, this.selectedStatus), this.flag)
            }
        },

        components: {
            split,
            star,
            ratingSelect
        },
        methods: {
//            滑动初始化
            initScroll: function () {
                new this.$bs(this.$refs.ratings, {
                    tap: true
                });
            },

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

            ratingFilter: function (type) {
                this.selectedStatus = type
            },

            changeFlag: function (flag) {
                this.flag = flag;
            }

        },
        created: function () {
            this.$nextTick(
                () => {
                    this.initScroll();
                }
            )
        }
    }
</script>

<style lang="less" type="text/less">
    @import "../../common/less/mixtin";

    .ratings {
        position: fixed;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                padding: 6px 0;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, .1);
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left: 6px;
                }
                .score-wrapper {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .star {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .score {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    .title {
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .delivery {
                        margin-left: 12px;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                display: flex;
                padding: 18px 0;
                .border-1px(rgba(7, 17, 27, .1));
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img {
                        border-radius: 50%;
                    }
                }
                .content {
                    flex: 1;
                    position: relative;
                    .name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                    }
                    .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .text {
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                    }
                    .recommend {
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up, .item {
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .icon-thumb_up {
                            color: rgb(0, 160, 220);
                        }
                        .item {
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, .1);
                            border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                            font-size: 9px;
                        }
                    }
                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>