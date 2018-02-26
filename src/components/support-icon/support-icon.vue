<template>
    <span :class="['support-icon',classMap[supportType]]"></span>
</template>

<script>
    export default {
        data(){
            return{
                classMap:[]
            }
        },
        props:['supportType'],
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'special', 'invoice','']
        },

    }
</script>

<style lang="less" type="text/less">
    @import "../../common/less/mixtin";
    .support-icon {
        display: block;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.decrease {
            .bg-image('decrease_1')
        }
        &.discount {
            .bg-image('discount_1')
        }
        &.guarantee {
            .bg-image('guarantee_1')
        }
        &.special {
            .bg-image('special_1')
        }
        &.invoice {
            .bg-image('invoice_1')
        }

    }
</style>