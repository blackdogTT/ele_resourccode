<template>
    <div class="star">
        <span :class='[start_size,item]' v-for="(item,key) in start_status"></span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                grade: 5,
                scoreArr: [],
                star_on: 'star_on',
                star_half: 'star_half',
                star_off: 'star_off'
            }
        },
        props: {
            size: {
                validator(val) {
                    return val == 48 || val == 24 || val == 36
                }
            },
            score: {
                validator(val) {
                    return val >= 0 && val <= 5
                }
            }
        },
        computed: {
            start_size: function () {
                return ('star-' + this.size)
            },

            start_status: function () {
//                每次该改变重置数组
                this.scoreArr = [];
                for (let i = 0; i < this.grade; i++) {
                    this.scoreArr.push(this.star_off)
                }
//            传进来的分数
                let score = this.score;
                let star_on_amount = Math.floor(score);

                for (let i = 0; i < star_on_amount; i++) {
                    this.scoreArr[i] = this.star_on
                }
                let star_half_amount = score - star_on_amount;
                if (star_half_amount >= 0.5) {
                    this.scoreArr[star_on_amount] = this.star_half
                }

                return this.scoreArr
            }
        }
    }
</script>

<style lang="less" type="text/less">
    @import "../../common/less/mixtin";

    .star {
        font-size: 0;
        span {
            display: inline-block;
            background-repeat: no-repeat;
        }
        .star-24 {
            width: 10px;
            height: 10px;
            background-size: 10px 10px;
            margin-right: 3.5px;
            &:last-of-type {
                margin-right: 0;
            }
            &.star_on {
                .bg-image('star24_on')
            }
            &.star_half {
                .bg-image('star24_half')
            }
            &.star_off {
                .bg-image('star24_off')
            }
        }

        .star-36 {
            width: 15px;
            height: 15px;
            background-size: 15px 15px;
            margin-right: 6.25px;
            &:last-of-type {
                margin-right: 0;
            }
            &.star_on {
                .bg-image('star36_on')
            }
            &.star_half {
                .bg-image('star36_half')
            }
            &.star_off {
                .bg-image('star36_off')
            }
        }

        .star-48 {
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
            margin-right: 21.5px;
            &:last-of-type {
                margin-right: 0;
            }
            &.star_on {
                .bg-image('star48_on')
            }
            &.star_half {
                .bg-image('star48_half')
            }
            &.star_off {
                .bg-image('star48_off')
            }
        }

    }
</style>