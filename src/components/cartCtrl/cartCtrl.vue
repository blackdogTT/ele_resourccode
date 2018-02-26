<template>
    <div class="cart-ctrl" ref="preventPop">

        <transition name="revolve">
            <span class="reduce" @tap="reduce" @click="reduce" v-if="food.count">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-remove_circle_outlin"></use>
                </svg>
            </span>
        </transition>

        <transition name="total">
            <span class="amount" v-if="food.count">{{food.count}}</span>
        </transition>

        <span class="add" @tap="ballActive" @click="ballActive" ref="addBtn">
           <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-add_circle"></use>
           </svg>
        </span>


    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {

        computed: {
            ...mapState(['selected']),

        },
        props: ['food'],

        methods: {
            ...mapActions(['addItem', 'reduceItem']),
            //小球运动和添加数量合并在此函数中
            ballActive: function (event) {
//                数量增加
                if (this.identify===false){
                    this.identify = true
                }
                this.addItem(this.food);
//                小球运动
                const cartLeft = 40;
                const cartTop = 29;
                let addBtn = this.$refs.addBtn;
//                小球内外层
                let ball = document.createElement('div');
                ball.className = 'ball';
                let ballY = document.createElement('div');
                ballY.className = 'ball-y';
                ball.appendChild(ballY);
                addBtn.appendChild(ball);
//                小球初始位置
                let X = ball.getBoundingClientRect().left;
                let Y = ball.getBoundingClientRect().top;
//                屏幕宽高
                let clintX = window.innerWidth;
                let clintY = window.innerHeight;
//                购物车图标位置
                let targetX = cartLeft;
                let targetY = clintY - cartTop;
//                小球最终位置
                let left = -(X - targetX);
                let top = (targetY - Y);

                ball.style.left = left + 'px';
                ballY.style.top = top + 'px';

                ballY.addEventListener('transitionend', function () {
                    ball.parentNode.removeChild(ball);
                });
                event.stopPropagation();
            },
//            减少数量
            reduce: function (event) {
                if (this.food.count > 0) {
                    this.food.count -= 1
                }
                event.stopPropagation();
            }
        },

    }
</script>

<style lang="less" type="text/less">
    .cart-ctrl {
        color: rgb(0, 160, 200);
        position: relative;
        span {
            display: inline-block;
            vertical-align: middle;
            line-height: 24px;
            height: 24px;
            font-size: 24px;
            position: relative;
            &.amount {
                text-align: center;
                color: rgb(147, 153, 159);
                font-size: 10px;
                width: 24px;
            }
        }
        .ball {
            position: absolute;
            top: 0;
            left: 0;
            transition: all .5s linear;
            .ball-y {
                position: absolute;
                top: 0;
                left: 0;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: #00a0c8;
                -webkit-transition: all .5s cubic-bezier(0.430, -0.600, 0.930, -0.015);
                -moz-transition: all .5s cubic-bezier(0.430, -0.600, 0.930, -0.015);
                -o-transition: all .5s cubic-bezier(0.430, -0.600, 0.930, -0.015);
                transition: all .5s cubic-bezier(0.430, -0.600, 0.930, -0.015);

                -webkit-transition-timing-function: cubic-bezier(0.430, -0.600, 0.930, -0.015);
                -moz-transition-timing-function: cubic-bezier(0.430, -0.600, 0.930, -0.015);
                -o-transition-timing-function: cubic-bezier(0.430, -0.600, 0.930, -0.015);
                transition-timing-function: cubic-bezier(0.430, -0.600, 0.930, -0.015);
            }
        }
    }

    /*‘-’按钮旋转动画*/
    .revolve-enter,.revolve-leave-to{
        transform: translatex(24px) rotate(360deg);
        opacity: 0;
    }
    .revolve-leave-active,.revolve-enter-active{
        transition: all 0.3s linear;
    }

    .total-enter,.total-leave-to{
        opacity: 0;
    }
    .total-leave-active,.total-enter-active{
        transition: all 0.3s linear;
    }
</style>