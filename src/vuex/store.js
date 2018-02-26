import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

const state = {
    //整个goods对象
    goods: '',
    //以名值队显示的每一个food对象，初始化了count:0属性，通过是否为0来判断是否被选中
    selected: '',
    flags:false
};

const mutations = {
    //需要一个商品条目参数
    ADD(state, food) {

//      已经被选中，只需改数量
        state.selected[food.name].count += 1;
    },
    REDUCE(state, food) {
        if (food.count > 0) {
            state.selected[food.name].count -= 1
        }
    },
    INITGOODS(state, goods) {
        state.goods = goods;
    },
    INITSELECTED(state, selected){
        state.selected = selected;
    },
    FLAGS(state){
        state.flags = true
    }
};

const actions = {
    addItem({commit}, food) {
        commit('ADD', food)
    },
    reduceItem({commit}, food) {
        commit('REDUCE', food)
    },
    init(context) {
        axios.get('/api/goods').then((res) => {
            let selected = {};
            let goods = res.data.data;
            goods.forEach(function (item) {
                item.foods.forEach(function (item1) {
                    item1.count = 0;
                    selected[item1.name] = item1
                })
            });

            context.commit('INITGOODS', goods);
            context.commit('INITSELECTED', selected);
        }).then(()=>{context.commit('FLAGS')})
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})
