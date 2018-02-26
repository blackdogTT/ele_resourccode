<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" @tap="select(0)">全部<span class="count">{{ratingsAmount}}</span></span>
            <span class="block positive" @tap="select(1)">满意<span class="count">{{goodRatings}}</span></span>
            <span class="block negative" @tap="select(2)">不满意<span class="count">{{badRatings}}</span></span>
        </div>
        <div class="switch">
            <svg class="icon" :class="{'on':blankFilterFlag}" aria-hidden="true" @tap="blankFilter">
                <use xlink:href="#icon-check_circle"></use>
            </svg>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                blankFilterFlag:true,
            }
        },
        props:{
            ratings:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        computed:{
            goodRatings:function () {
                let count = 0;
                this.ratings.forEach(function (t) {
                    if (t.rateType===0){
                        count++
                    }
                });
                return count
            },
            badRatings:function () {
                let count = 0;
                this.ratings.forEach(function (t) {
                    if (t.rateType===1){
                        count++
                    }
                });
                return count
            },
            ratingsAmount:function () {
                return this.ratings.length
            }
        },
        methods:{
            select:function (index) {
//                排他改变样式
                let span = document.querySelectorAll('span.block');
                span.forEach(function (t) {
                   if (t.classList.contains('active')){
                       t.classList.remove('active')
                   }
                });
                span[index].classList.add('active');
//                根据不同按钮传递事件
                if (index === 0){
                    this.$emit('selectRating','all')
                }
                else if (index ===1){
                    this.$emit('selectRating','good')
                }
                else if (index===2){
                    this.$emit('selectRating','bad')
                }
            },

//            过滤空评论
            blankFilter:function () {
                this.blankFilterFlag = !this.blankFilterFlag;
                if (this.blankFilterFlag){
//                    不显示空评论
                    this.$emit('blankFilter','hide')
                }
                else {
//                    显示空评论
                    this.$emit('blankFilter','show')
                }
            },

            initRatings:function () {
                let good = 0;
                let bad = 0;
                this.ratings.forEach(function (t) {
                    if (t.rateType === 0){
                        good++
                    }
                    else if (t.rateType === 1){
                        bad++
                    }
                });
                let all = good+bad;
                this.goodRatings = good;
                this.badRatings = bad;
                this.allRatings = all;
            }
        },
    }
</script>

<style lang="less" type="text/less">
    //引入样式
    @import "../../common/less/mixtin";

    .ratingselect {
        .rating-type {
            padding: 18px 0;
            margin: 0 18px;
            .border-1px(rgba(7, 17, 27, .1));
            font-size: 0;
            .block {
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
                line-height: 16px;
                color: rgb(77, 85, 93);
                font-size: 12px;
                &.active {
                    color: #fff;
                }
                &.positive {
                    background: rgba(0, 160, 220, .2);
                    &.active {
                        background: rgb(0, 160, 220);
                    }
                }
                &.negative {
                    background: rgba(77, 85, 93, .2);
                    &.active {
                        background: rgb(77, 85, 93);
                    }
                }
                .count {
                    font-size: 8px;
                    margin-left: 2px;
                }
            }
        }
        .switch {
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: 1px solid rgba(7, 17, 27, .1);
            color: rgb(147, 153, 159);
            font-size: 0;
            svg {
                &.on {
                    color: #00c850;
                }
                display: inline-block;
                vertical-align: top;
                margin-right: 4px;
                font-size: 24px;
            }
            .text {
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
        }
    }
</style>