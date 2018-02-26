<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>

            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">
                    {{seller.name}}
                </span>
                </div>

                <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>

                <div class="support" v-if="seller.supports">
                    <div class="support-icon">
                        <supportIcon :supportType='seller.supports[0].type'></supportIcon>
                    </div>
                    <span class="text">
                    {{seller.supports[0].description}}
                </span>
                </div>

            </div>

            <div class="support-count" v-if="seller.supports" @click="detailShowOrHide">
                <span>{{seller.supports.length}}个</span>
                <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-keyboard_arrow_right"></use>
                </svg>
            </span>
            </div>
        </div>

        <!---->
        <div class="bulletin-wrapper">
            <span></span><span>{{seller.bulletin}}</span><span><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-keyboard_arrow_right"></use>
                </svg></span>
        </div>

        <!--背景图片-->
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>

        <!--详情页面-->
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper">
                    <h1>{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <my_star :size='48' :score='seller.score'></my_star>
                    </div>

                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>

                    <ul class="discount-list">
                        <li class="discount-item" v-for="(item,key) in seller.supports">
                        <span class="discount-item-icon">
                            <supportIcon :supportType='key'></supportIcon>
                        </span>
                            <span class="discount-item-text">{{item.description}}</span>
                        </li>
                    </ul>

                    <!--商家公告-->
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="seller-info">
                        {{seller.bulletin}}
                    </div>
                </div>
                <div class="detail-close" @click="detailShowOrHide">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import my_star from '../star/star.vue'
    import supportIcon from '../support-icon/support-icon.vue'

    export default {
        data() {
            return {
                detailShow: false
            }
        },
        props: {
            seller: {
                type: Object
            }
        },

        methods: {
            detailShowOrHide() {
                this.detailShow = !(this.detailShow);
            }
        },
        components: {
            my_star,
            supportIcon
        }

    }
</script>

<style lang="less" type="text/less">
    //变量引入
    @import "../../common/less/mixtin";


    //样式

    .header {
        background-color: rgba(7, 17, 27, 0.5);
        color: #fff;
        position: relative;
        .content-wrapper {
            position: relative;
            .avatar {
                vertical-align: top;
                padding: 24px 16px 18px 24px;
                display: inline-block;
                font-size: 14px;
                img {
                    border-radius: 2px;
                }
            }

            .content {
                font-size: 0;
                padding-top: 24px;
                vertical-align: top;
                display: inline-block;
                .title {
                    padding: 2px 0 8px 0;
                    .brand {
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        .bg-image('brand');
                        -webkit-background-size: 30px 18px;
                        background-size: 30px 18px;
                        vertical-align: top;
                    }
                    .name {
                        display: inline-block;
                        padding-left: 6px;
                        vertical-align: top;
                        font-size: 16px;
                        color: @font-color;
                        font-weight: bold;
                        line-height: 18px;

                    }

                }
                .description {
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                    color: @font-color;
                }
                .support {
                    .text {
                        font-size: 12px;
                        line-height: 12px;
                        vertical-align: top;
                    }
                    .support-icon {
                        vertical-align: top;
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                    }
                }
            }

            .support-count {
                position: absolute;
                bottom: 18px;
                right: 12px;
                padding: 0 8px;
                height: 24px;
                line-height: 22px;
                text-align: center;
                border-radius: 7px;
                color: @font-color;
                background-color: rgba(0, 0, 0, 0.2);
                font-size:0;
                span:nth-of-type(1) {
                    font-size: 10px;
                }
                span:nth-of-type(2) {
                    margin-left: 1px;
                    font-size: 10px;
                }
            }
        }

        .bulletin-wrapper {
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 24px 0 12px;
            background-color: rgba(0, 0, 0, 0.2);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            span:nth-of-type(1) {
                /*图片*/
                width: 22px;
                height: 12px;
                margin-right: 4px;
                display: inline-block;
                .bg-image('bulletin');
                background-size: 22px 12px;
                vertical-align: middle;

            }
            span:nth-of-type(2) {
                font-size: 10px;
                vertical-align: middle;
            }
            span:nth-of-type(3) {
                svg {
                    position: absolute;
                    right: 12px;
                    top: 7px;
                }
            }

        }

        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            z-index: -1;
            filter: blur(10px)
        }

        .detail {
            position: fixed;
            backdrop-filter: blur(10px);
            z-index: 999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(7, 17, 27, 0.8);
            color: white;
            overflow: auto;
            .detail-wrapper {
                min-height: 100%;
                padding-bottom: 32px;
                h1 {
                    margin-top: 64px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 16px;
                    color: @font-color;
                }
                .star-wrapper {
                    width: 100%;
                    padding: 16px 0 28px 0;
                    font-size: 0;
                    text-align: center;
                }

                .title {
                    display: flex;
                    width: 90%;
                    margin: 0 auto 24px;
                    align-items: center;

                    .line {
                        flex: 1;
                        height: 1px;
                        background-color: rgba(255, 255, 255, .8);
                    }
                    .text {
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(255, 255, 255);
                        font-weight: 700;
                        padding: 0 12px;
                    }
                }

                .discount-list {
                    width: 90%;
                    margin: 0 auto 28px auto;
                    .discount-item {
                        font-size: 0;
                        margin: 0 12px 12px 12px;
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                        .discount-item-icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            vertical-align: middle;
                        }
                        .discount-item-text {
                            font-size: 12px;
                            color: @font-color;
                            line-height: 12px;
                            font-weight: 200;
                            vertical-align: middle;
                        }
                    }
                }
            }
            .seller-info{
                width: 90%;
                margin: 0 auto;
                padding: 0 12px;
                font-size: 12px;
                line-height: 24px;
                font-weight: 200;
                color: @font-color;

            }

            .detail-close {
                position: relative;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 32px;
                margin-bottom: 32px;
                margin-top: -32px;
                clear: both;
            }
        }
    }

    /*动画效果*/
    .fade-enter-active,.fade-leave-active{
        transition:opacity ease .5s;
    }
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>